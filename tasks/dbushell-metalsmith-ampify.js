var imgsize     = require('image-size');

module.exports = plugin;

function plugin(options) {

    return function (files, metalsmith, done) {

        var meta = metalsmith.metadata();

        for (var file in files) {

            file = files[file];
            var data = file.contents.toString(),
                images = data.match(/<img(.*?)>/g),
                iframes = data.match(/<iframe(.*?)>/g);

            if (images) {

                var src, alt, dim, imgr = new RegExp('src="' + meta.site_url + '(.*?)"', 'g');

                images.forEach(function(img) {

                    // convert absolute to relative URLs hosted here at `site_url`
                    img = img.replace(imgr, 'src="$1"');
                    src = /src="(.*?)"/g.exec(img)[1];
                    alt = /alt="(.*?)"/g.exec(img)[1];

                    // replace external images with hyperlink
                    if (src.indexOf('http://') !== -1) {
                        data = data.replace(img, '<a href="' + src + '" target="_blank">View image: “' + alt + '”</a>');
                    // replace relative images with AMP img elements
                    } else {
                        dim = imgsize('build' + src);
                        // must wrap in a span with max-width because native behaviour is lost
                        data = data.replace(img, '<span style="display: block; max-width:' + dim.width + 'px"><amp-img width="' + dim.width + '" height="' + dim.height + '" layout="responsive" src="' + src + '" alt="' + alt + '"></amp-img></span>');
                    }
                });
            }

            // replace iframes with link to video content
            if (iframes) {
                iframes.forEach(function(iframe) {
                    var src = /src="(.*?)"/g.exec(iframe)[1];
                    data = data.replace(iframe, '<a class="button" href="' + src + '" target="_blank">View Video');

                });
            }

            file.contents = new Buffer(data);
        }

        done();

    };

}
