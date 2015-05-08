var Handlebars = require('handlebars'),
    Moment = require('moment'),
    _      = require('lodash'),
    path   = require('path'),
    fs     = require('fs');

module.exports = plugin;

function plugin(options) {

    return function(files, metalsmith, done) {

        var meta = metalsmith.metadata();

        var sitemapTemplate = fs.readFileSync(__dirname + '/lib/sitemap.xml', { encoding: 'utf8' }),
            entryTemplate = fs.readFileSync(__dirname + '/lib/sitemap-entry.xml', { encoding: 'utf8' });

        sitemapTemplate = Handlebars.compile(sitemapTemplate);
        entryTemplate = Handlebars.compile(entryTemplate);

        var entries = _(Object.keys(files)).map(function (file) {

            if (!/\.html$/.test(path.extname(file))) {
                return;
            }

            var data = files[file];
            if (data.draft || data.private) {
                return;
            }

            var entry = {
                loc: meta.site_url + '/' + file.replace(/index\.html$/, ''),
                changefreq: 'monthly',
                priority: '0.5'
            };

            if (data && data.stats && data.stats.mtime) {
                 entry.lastmod = Moment(data.stats.mtime).toISOString();
            } else {
                return;
            }

            if (['index.html'].indexOf(data.template) > -1) {
                entry.changefreq = 'daily';
                entry.priority = '1.0';
            }

            if (data.template.indexOf('service-') > -1) {
                entry.changefreq = 'weekly';
                entry.priority = '0.9';
            }

            if (['page.html', 'portfolio.html'].indexOf(data.template) > -1) {
                entry.changefreq = 'weekly';
                entry.priority = '0.8';
            }

            return entryTemplate(entry);

        }).compact().join('');

        var contents = sitemapTemplate({ entries: entries });

        files['sitemap.xml'] = {
            contents: new Buffer(contents)
        };

        done();

    };

}
