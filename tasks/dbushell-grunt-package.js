var Moment = require('moment'),

    fs = require('fs'),
    cp = require('child_process');

module.exports = plugin;

function plugin(grunt)
{
    grunt.registerMultiTask('dbushell_package', 'dbushell.com', function() {

        var data = this.data,
            done = this.async();

        var distDir  = normalizePath(this.data.distDir) || 'build',
            distDate = Moment(new Date()).format('YYYY-MM-DD-HHmm');

        // remove legacy files
        // removeDir(distDir + '/images/');
        removeDir(distDir + '/wp-content/');

        // archive build directory
        var cpZip = cp.exec('zip -r ' + distDir + '-' + distDate + '.zip ' + distDir + '/*');
        cpZip.on('exit', function(code) {

            // remove temporary build directory
            // removeDir(distDir);

            done();
        });

    });
}

/**
 * strip leading and trailing slashes
 */
var normalizePath = function(p)
{
    return (typeof p === 'string' ? p : '').trim().replace(/^\/|\/$/g, '');
};

/**
 * remove dir and all its sub-directoies and files recursively
 * https://gist.github.com/liangzan/807712
 */
var removeDir = function(dir)
{
    var files;
    try {
        files = fs.readdirSync(dir);
    } catch(e) {
        return;
    }
    files.forEach(function(file)
    {
        var p = dir + '/' + file;
        if (fs.statSync(p).isFile()) {
            fs.unlinkSync(p);
        } else {
            removeDir(p);
        }
    });
    fs.rmdirSync(dir);
};
