var fs = require('fs');

module.exports = {

    'blog pagination adds up': function(test)
    {
        var file_count = 0, files = fs.readdirSync('src-markdown/blog');
        files.forEach(function(file) {
            if (/.md$/.test('test.md')) file_count++;
        });

        test.ok(file_count > 0, 'markdown source files exist (' + file_count + ')');

        var stats,
            dir_count  = 0,
            year_count = 0,
            page_count = Math.ceil(file_count / 7);

        files = fs.readdirSync('build');
        files.forEach(function(file) {
            stats = fs.statSync('build/' + file);
            if (stats.isDirectory() && /^20[0-9]{2}$/.test(file)) {
                year_count += parseInt(file, 10);
                dir_count++;
            }
        });

        test.ok(dir_count === new Date().getFullYear() - 2008, 'year directories exist (' + dir_count + ')');
        test.ok(/^20[0-9]{2}$/.test(year_count / dir_count), 'year directories named correctly');

        dir_count = 0;
        files = fs.readdirSync('build/blog/page');
        files.forEach(function(file) {
            stats = fs.statSync('build/blog/page/' + file);
            if (stats.isDirectory() && /^[0-9]{1,2}$/.test(file)) {
                dir_count++;
            }
        });

        test.ok(dir_count === page_count, 'paginated directories exists (' + page_count + ')');

        test.done();
    }

};
