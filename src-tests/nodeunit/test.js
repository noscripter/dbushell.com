var fs = require('fs');

module.exports = {

    'files and directories exist': function(test)
    {
        test.ok(fs.existsSync('build'), 'build');
        test.ok(fs.existsSync('build/assets'), 'build/assets');
        test.ok(fs.existsSync('build/blog'), 'build/blog');
        test.ok(fs.existsSync('build/index.html'), 'index.html');
        test.ok(fs.existsSync('build/contact-submit.php'), 'contact-submit.php');
        test.ok(fs.existsSync('build/sitemap.xml'), 'sitemap.xml');
        test.done();
    },
};
