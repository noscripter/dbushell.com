var fs = require('fs');

module.exports = plugin;

function plugin(grunt)
{
    grunt.registerMultiTask('dbushell_build', 'dbushell.com', function() {

        var done = this.async();

        var distDir  = normalizePath(this.data.distDir) || 'build';
        removeDir('./' + distDir);

        fs.mkdirSync('./' + distDir);
        fs.mkdirSync('./' + distDir + '/assets');

        done();

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
