var Metalsmith  = require('metalsmith'),
    Handlebars  = require('handlebars'),
    Moment      = require('moment'),

    ms_feed        = require('metalsmith-feed'),
    ms_drafts      = require('metalsmith-drafts'),
    ms_branch      = require('metalsmith-branch'),
    ms_collections = require('metalsmith-collections'),
    ms_pagination  = require('metalsmith-pagination'),
    ms_markdown    = require('metalsmith-markdown'),
    ms_layouts     = require('metalsmith-layouts'),
    ms_permalinks  = require('metalsmith-permalinks'),
    ms_db_markup   = require('./dbushell-metalsmith-markup'),
    ms_db_sitemap  = require('./dbushell-metalsmith-sitemap'),

    fs          = require('fs'),
    path        = require('path'),
    striptags   = require('striptags');

module.exports = plugin;

function plugin(grunt)
{
    // based on https://github.com/doingweb/grunt-metalsmith

    grunt.registerMultiTask('dbushell_metalsmith', 'dbushell.com', function() {

        var done = this.async();

        var options = this.options({
            src: 'src-markdown',
            dest: 'build',
            clean: false,
            watch: false,
            partials: { },
            metadata: { }
        });

        var metalsmith = new Metalsmith(process.cwd());

        metalsmith.source(options.src);
        metalsmith.destination(options.dest);
        metalsmith.metadata(options.metadata);

        // not sure if this actually fixes the ulimit issue...
        metalsmith.concurrency(512);

        metalsmith.clean(options.clean);

        // return array of partials for metalsmith-templates
        var parts = fs.readdirSync('src-templates/partials');
        if (Array.isArray(parts) && parts.length) {
            parts.forEach(function(name) {
                name = name.split('.')[0];
                options.partials[name] = 'partials/' + name;
            });
        }

        // if A or B conditional
        Handlebars.registerHelper('either', function(a, b, options) {
            return (a || b) ? options.fn(this) : options.inverse(this);
        });

        // replicate WordPress `is_frontpage` and `is_single` template functions
        Handlebars.registerHelper('is', function(type, options) {
            var is = false;
            if (type === 'home' && ['index.html'].indexOf(this.layout) > -1) is = true;
            if (type === 'contact' && ['contact.html'].indexOf(this.layout) > -1) is = true;
            if (type === 'single' && ['page.html', 'single.html'].indexOf(this.layout) > -1) is = true;
            return is ? options.fn(this) : options.inverse(this);
        });

        // output the contents of a file into the document
        var inline = [];
        Handlebars.registerHelper('inline', function(url) {
            if (typeof inline[url] !== 'string') {
                try {
                    inline[url] = fs.readFileSync(options.dest + '/' + url).toString();
                } catch(e) {
                    inline[url] = '';
                }
            }
            return new Handlebars.SafeString(inline[url]);
        });

        // write absolute URLs
        Handlebars.registerHelper('site_url', function(url) {
            if (typeof url !== 'string') return options.metadata.site_url + '/';
            if (url.length > 0 && url.lastIndexOf('.') == -1) {
                url += '/';
            }
            return options.metadata.site_url + '/' + url;
        });

        // date formatting with Moment.js
        Handlebars.registerHelper('moment', function(context, format) {
            if (format === 'ISO') return Moment(context).toISOString();
            return Moment(context).format(format);
        });

        // format meta content for <title>
        Handlebars.registerHelper('page_title', function(context, options) {
            if (this.layout === 'index.html') {
                return new Handlebars.SafeString(this.site_name + ' &#8211; ' + this.site_desc);
            }
            var title = this.title;
            if (!title) {
                if (this.layout === 'archive.html') {
                    title = 'Blog';
                    if (this.pagination.num > 1) {
                        title += ' (Page ' + this.pagination.num + ')';
                    }
                }
            }
            title += ' &#8211; ' + this.site_name;
            title += ' &#8211; ' + this.site_desc;
            return new Handlebars.SafeString(title);
        });

        function post__excerpt(contents)
        {
            if (typeof contents !== 'string') return '';
            var text = striptags(contents),
                words = text.split(' ');
            if (words.length >= 55) {
                text = words.slice(0, 55).join(' ') + ' [&hellip;]';
            }
            return new Handlebars.SafeString('<p>' + text + '</p>');
        }

        // create post excerpt from content similar to WordPress
        Handlebars.registerHelper('post__excerpt', post__excerpt);

        // format post title to avoid orphans
        Handlebars.registerHelper('post__title', function(title) {
            var pos, words = title.split(' ');
            if (words.length > 3 && words[words.length - 1].length < 9) {
                pos = title.lastIndexOf(' ');
                title = title.substr(0, pos) + '<span class="nbsp">&nbsp;</span>' + title.substr(pos + 1);
            }
            return new Handlebars.SafeString(title);
        });

        // mark file being watched
        if (options.watch) {
            options.watching = options.watching.replace(new RegExp('^' + options.src + '\/'), '');
            metalsmith.use(function(files, metalsmith, done) {
                Object.keys(files).forEach(function(file) {
                    if (file === options.watching) {
                        files[file].watching = true;
                    }
                });
                done();
            });
        }

        metalsmith.use(ms_drafts(true))

            .use(ms_db_markup({ }))

            .use(ms_markdown({
                smartypants: true
            }))

            // metadata for RSS feed
            .use(function (files, metalsmith, done) {
                for (var file in files) {
                    if (!/.html/.test(path.extname(file))) {
                        continue;
                    }
                    files[file].rss_content = post__excerpt(files[file].contents.toString());
                }
                done();
            })

            .use(ms_collections({
                latest: {
                    pattern: 'blog/*.html',
                    sortBy: 'date',
                    reverse: true,
                    limit: 6
                },
                blog: {
                    pattern: 'blog/*.html',
                    sortBy: 'date',
                    reverse: true
                }
            }))

            .use(ms_pagination({
                'collections.blog': {
                    first: 'blog/index.html',
                    path: 'blog/page/:num/index.html',
                    layout: 'archive.html',
                    perPage: 7
                }
            }))

            // top-level pages use basic slug
            .use(ms_branch('*.html').use(ms_permalinks({
                    pattern: ':slug',
                    relative: false
                }))
            )

            // nested pages include parent slug (exclude blog posts)
            .use(ms_branch('!blog/*.html')
                .use(ms_branch('!amp/*.html')
                .use(ms_branch('*/*.html')
                .use(ms_branch('!index.html')
                    .use(ms_permalinks({
                        pattern: ':parent/:slug'
                    }))
                )))
            )

            // blog posts include date slug
            .use(ms_branch('blog/*.html')
                .use(ms_branch('!index.html')
                    .use(ms_permalinks({
                        pattern: ':date/:slug',
                        date: 'YYYY/MM/DD',
                        relative: false
                    }))
                )
            )

            // blog have alternative AMP version
            .use(ms_branch('amp/*.html').use(ms_permalinks({
                    pattern: ':date/:slug/amp',
                    date: 'YYYY/MM/DD',
                    relative: false
                }))
            )

            // blog pages use basic slug
            .use(ms_branch('blog/page/*/index.html').use(ms_permalinks({
                    pattern: ':slug',
                    relative: false
                }))
            )

            .use(function (files, metalsmith, done) {
                for (var file in files) {
                    if (files[file].amp !== true) continue;
                    files[file].canonical = files[file].path.replace(/\/amp$/, '');
                }
                done();
            })

            .use(ms_layouts({
                engine: 'handlebars',
                directory: 'src-templates',
                partials: 'src-templates/partials'
            }))

            .use(ms_db_sitemap({ }))

            .use(ms_feed({
                author: 'David Bushell',
                webMaster: 'hi@dbushell.com (David Bushell)',
                title: 'dbushell.com',
                description: 'David Bushell’s Web Design & Front-end Development Blog',
                language: 'en',
                site_url: 'http://dbushell.com',
                destination: 'rss.xml',
                collection: 'blog',
                postDescription: function(file) {
                    return file.rss_content || '';
                }
            }))

        ;

        // remove all files that aren't being watched
        if (options.watch) {
            metalsmith.use(function(files, metalsmith, done) {
                Object.keys(files).forEach(function(file) {
                    if (files[file].watching) {
                        // keep
                    } else {
                        delete files[file];
                    }
                });
                done();
            });
        }

        metalsmith.build(function(err) {
            if (err) {
                done(err);
                return;
            }
            grunt.log.writeln('Built files in ' + metalsmith.source() + ' to ' + metalsmith.destination());
            done();
        });

    });

}
