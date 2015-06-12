
module.exports = function(grunt)
{
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-svg2png');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('css',        [ 'sass', 'autoprefixer' ]);
    grunt.registerTask('assets',     [ 'copy', 'css', 'uglify', 'svgmin', 'svg2png', 'imageoptim' ]);
    grunt.registerTask('content',    [ 'dbushell_metalsmith' ]);

    grunt.registerTask('default',    [ 'jshint', 'dbushell_build', 'assets', 'content' ]);
    grunt.registerTask('package',    [ 'jshint', 'dbushell_build', 'assets', 'content', 'dbushell_package' ]);

    grunt.registerTask('test',       [ 'jshint', 'nodeunit' ]);

    grunt.event.on('watch', function(action, path) {
        grunt.config('dbushell_metalsmith.all.options.watch', true);
        grunt.config('dbushell_metalsmith.all.options.watching', path);
    });

    grunt.initConfig({

        pkg: '<json:package.json>',

        jshint: {
            all: ['gruntfile.js', 'tasks/*.js'],
            test: ['src-tests/**/*.js'],
        },

        dbushell_build: { all: { } },

        dbushell_server: { all: { } },

        dbushell_package: {
            prod: {
                distDir: 'build'
            }
        },

        watch: {
            css: {
                files: 'src-assets/scss/**/*.scss',
                tasks: ['css'],
                options: {
                  interrupt: true
                }
            },
            js: {
                files: 'src-assets/js/**/*.js',
                tasks: ['uglify'],
                options: {
                  interrupt: true
                }
            },
            markdown: {
                files: ['src-markdown/**/*.md'],
                tasks: ['dbushell_metalsmith'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            }
        },

        nodeunit: {
            test: ['src-tests/nodeunit/**/*.js'],
            options: {
                reporter: 'verbose'
            }
        },

        dbushell_metalsmith: {
            all: {
                options: {
                    watch: false,
                    metadata: {
                        site_ver  : '7.2.0',
                        site_url  : 'http://dbushell.com',
                        site_name : 'David Bushell &#8211; Web Design &amp; Front-end Development',
                        site_desc : 'David Bushell make websites. I help small businesses, start-ups, individuals, and fellow web agencies make the most of their web presence.'
                    }
                }
            }
        },

        copy: {
            all: {
                files: [
                    // copy legacy files and PHP content
                    { expand: true, cwd: 'src-static/', src: ['**/*'], dest: 'build/' },
                    // copy assets into build directory
                    { expand: true, cwd: 'src-assets/', src: ['fonts/**/*'], dest: 'build/assets/' },
                    { expand: true, cwd: 'src-assets/', src: ['img/**/*'], dest: 'build/assets/' },
                    { expand: true, cwd: 'src-assets/', src: ['js/**/*'], dest: 'build/assets/' }
                ]
            }
        },

        sass: {
            all: {
                options: {
                    outputStyle: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'src-assets/scss',
                    src: ['*.scss'],
                    dest: 'build/assets/css',
                    ext: '.css'
                }]
            }
        },

        uglify: {
            options: {
                preserveComments: 'some'
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'src-assets/',
                    src: ['js/**/*.js', '!js/**/*.min.js', 'js/**/iscroll*.js'],
                    dest: 'build/assets/',
                    ext: '.min.js'
                }]
            }
        },

        svgmin: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'src-assets/',
                    src: ['img/**/*.svg'],
                    dest: 'build/assets/'
                }],
                options: {
                    plugins: [{
                        removeViewBox: false
                    }]
                }
            }
        },

        svg2png: {
            all: {
                files: [{
                    cwd: 'build/assets/img/',
                    src: ['**/*.svg'],
                    dest: 'build/assets/img/'
                }]
            }
        },

        autoprefixer: {
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'build/assets/css/*.css',
                dest: 'build/assets/css/'
            }
        },

        imageoptim: {
            all: {
                src: ['build/assets/img'],
                options: {
                    quitAfter: true
                }
            }
        }

    });

};
