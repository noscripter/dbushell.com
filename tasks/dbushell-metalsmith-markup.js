var path = require('path');

module.exports = plugin;

function plugin(options) {

    return function(files, metalsmith, done) {

        // replace intermediate tags with HTML, e.g. {%p class="post__image"%}
        // these exist from the initial WordPress XML to Markdown conversion
        // new Markdown should just use HTML

        var meta = metalsmith.metadata();

        for (var file in files) {

            if (!/.md/.test(path.extname(file))) {
                continue;
            }

            var data = files[file].contents.toString();
            data = data.replace(/{%([a-z]*.*?)%}/g, '<$1>');
            files[file].contents = new Buffer(data);
        }

        done();

    };

}
