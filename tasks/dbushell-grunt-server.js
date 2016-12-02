var http = require('http'),
    cheerio = require('cheerio'),
    express = require('express');

module.exports = plugin;

function plugin(grunt)
{
    grunt.registerTask('dbushell_server', 'dbushell.com', function() {

        var done = this.async();

        var staticApp = express();
        staticApp.use(express.static('build'));
        staticApp.listen(9000);

        var server =  http.createServer(function(req, res) {

            var options = {
                port     : 9000,
                hostname : 'localhost',
                path     : req.url,
                method   : 'GET'
            };

            var pReq = http.request(options, function(pRes)
            {
                // pRes.setEncoding('utf8');

                if (pRes.headers && pRes.headers['content-type'].indexOf('text/html') === 0) {

                    var chunks = [];

                    pRes.on('data', function (chunk) {
                        chunks.push(chunk);
                    });

                    pRes.on('end', function() {

                        var $ = cheerio.load(new Buffer(chunks.join('')).toString());

                        // $('a[href]').each(function(i, el) {
                        //     var href = $(this).attr('href');
                        //     href = href.replace('http://dbushell-metalsmith.dev', 'http://localhost:8080');
                        //     href = href.replace('http://dbushell.com', 'http://localhost:8080');
                        //     $(this).attr('href', href);
                        // });

                        var html = $.html();

                        html = html.replace(/(http:\/\/dbushell-metalsmith.dev)/g, 'http://localhost:8080');
                        html = html.replace(/(http:\/\/dbushell.com)/g, 'http://localhost:8080');

                        pRes.headers['content-length'] = html.length;

                        res.writeHead(pRes.statusCode, pRes.headers);
                        res.write(new Buffer(html));
                        res.end();
                    });

                } else {

                    res.writeHead(pRes.statusCode, pRes.headers);

                    pRes.on('data', function (chunk) {
                        res.write(chunk);
                    });

                    pRes.on('end', function() {
                        res.end();
                    });
                }
            });

            pReq.end();
        });

        server.listen(8080);

        server.on('listening', function() {
            var address = server.address();
            grunt.log.writeln('Serving at http://' + address.address + ':' + address.port);
        });

        server.on('error', function(err) {
            grunt.fatal(err);
        });



    });
}
