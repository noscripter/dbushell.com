var path = require('path'),
    _    = require('lodash');

module.exports = plugin;

function plugin(options) {

    return function (files, metalsmith, done) {

        var meta = metalsmith.metadata();

        var ampfiles = {};

        for (var filepath in files) {
            file = files[filepath];

            if (!/.md/.test(path.extname(filepath))) {
                continue;
            }

            // replace intermediate tags with HTML, e.g. {%p class="post__image"%}
            // these exist from the initial WordPress XML to Markdown conversion
            // new Markdown should just use HTML
            var data = file.contents.toString();
            data = data.replace(/{%([a-z]*.*?)%}/g, '<$1>');
            file.contents = new Buffer(data);

            // update metadata for metalsmith-layouts (from deprecated metalsmith-templates)
            file.layout = file.template || 'page.html';

            // clone blog posts for amp alternative (contents Buffer is referenced for now)
            if (options.amp && file.layout === 'single.html') {
                var amppath = filepath.replace(/^blog/, 'amp');
                ampfiles[amppath] = _.clone(file);
                ampfiles[amppath].layout = 'amp.html';
                ampfiles[amppath].amp = true;
            }
        }

        var i = 0;

        if (options.amp) {
          // append ampfiles to file list
          Object.keys(ampfiles).forEach(function (file) {
              files[file] = ampfiles[file];
          });
        }

        done();

    };

}
