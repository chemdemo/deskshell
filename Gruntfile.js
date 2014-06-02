'use strict';

var path = require('path');
var fs = require('fs');

var UglifyJS = require('uglify-js');

var isWin = !!process.platform.match(/win32/);

module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        base: {
            'tmp': '.tmp',
            'src': 'client/src',
            'dev': 'client/dev',
            'dist': 'client/dist'
        },

        clean: {
            tmp: {
                src: ['<%= base.tmp %>']
            },
            dev: {
                src: ['<%= base.dev %>']
            },
            dist: {
                src: ['<%= base.dist %>']
            },
            'dist-main-js': {
                src: ['<%= base.dist %>/js/main.js']
            }
        },

        copy: {
            dev: {
                files: [
                    {
                        dot: true,
                        expand: true,
                        cwd: '<%= base.src %>/',
                        dest: '<%= base.dev %>/',
                        src: ['fonts/{,*/}*.*']
                    },
                    {
                        dot: true,
                        expand: true,
                        cwd: '<%= base.src %>/',
                        dest: '<%= base.dev %>/',
                        src: ['images/*.{png, jpg, gif}']
                    },
                    {
                        dot: true,
                        expand: true,
                        cwd: '<%= base.src %>/',
                        dest: '<%= base.dev %>/',
                        src: ['css/*.css']
                    },
                    {
                        dot: true,
                        expand: true,
                        cwd: '<%= base.src %>/',
                        dest: '<%= base.dev %>/',
                        src: ['js/lib/*.js']
                    },
                    {
                        expand: true,
                        cwd: '<%= base.src %>/',
                        dest: '<%= base.dev %>/',
                        src: ['./*.html']
                    }
                ]
            },
            // dist: {
            //     files: [
            //         {
            //             expand: true,
            //             cwd: '<%= base.src %>/',
            //             dest: '<%= base.dist %>/',
            //             src: ['./*.html']
            //         }
            //     ]
            // },
            'dist-fonts': {
                files: [{
                    dot: true,
                    expand: true,
                    cwd: '<%= base.src %>/',
                    dest: '<%= base.dist %>/',
                    src: ['fonts/{,*/}*.*']
                }]
            },
            'dist-img': {
                files: [{
                    dot: true,
                    expand: true,
                    dest: '<%= base.dist %>/',
                    cwd: '<%= base.src %>/',
                    src: ['images/*.{png, jpg, gif}']
                }]
            }
        },

        compass: {
            complie: {
                options: {
                    relativeAssets: true,
                    sassDir: '<%= base.src %>/scss',
                    imagesDir: '<%= base.src %>/images',
                    cssDir: '<%= base.src %>/css'
                }
            }
        },

        imagemin: {
            options: {
                optimizationLevel: 3
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= base.src %>/images/',
                        src: ['**/*.{png, jpg, gif}'],
                        dest: '<%= base.dist %>/images/'
                    },
                    {
                        expand: true,
                        cwd: '<%= base.src %>/fonts/',
                        src: ['**/*'],
                        dest: '<%= base.dist %>/fonts/'
                    }
                ]
            }
        },

        jst: {
            compile: {
                options: {
                    // amd: true,
                    namespace: 'JST',
                    processName: function(filename) {
                        var f = path.basename(filename, '.html');
                        return f.replace(/(?:_|-)(\w{1}?)/g, function(m) {
                            return m.toUpperCase().slice(1);
                        });
                    },
                    prettify: false,
                    processContent: function(src) {
                        return src
                            .replace(/\<\!\-\-[\s\S]*?\-\-\>/g, '') // remove comments
                            .replace(/(^\s+|\s+$)/gm, ''); // remove whitespaces
                    }
                },
                files: {
                    '<%= base.src %>/js/tmpl.js': ['<%= base.src %>/tmpl/*.html']
                }
            }
        },

        useminPrepare: {
            options: {
                dest: '<%= base.dist %>/'
            },
            html: {
                src: ['<%= base.src %>/*.html']
            }
        },

        rev: {
            dist: {
                options: {
                    algorithm: 'sha1',
                    length: 4
                },
                src: [
                    '<%= base.dist %>/js/*.js',
                    '<%= base.dist %>/css/*.css'/*,
                    '<%= base.dist %>/img/*.{jpg,jpeg,png,gif}'*/
                ]
            }
        },

        usemin: {
            html: ['<%= base.dist %>/*.html']
        },

        watch: {
            scss: {
                files: ['<%= base.src %>/scss/**/*.{scss,sass}'],
                tasks: ['compass']
            },
            tmpl: {
                files: ['<%= base.src %>/tmpl/*.html'],
                tasks: ['jst', 'browserify:dev']
            },
            js: {
                files: [
                    '<%= base.src %>/js/*.js',
                    '<%= base.src %>/js/cls/*.js'
                ],
                tasks: ['browserify:dev']
            },
            html: {
                files: [
                    '<%= base.src %>/index.html'
                ],
                tasks: ['copySrcHtml']
            }
        },

        browserify: {
            dev: {
                options: {
                    debug: true
                },
                files: {
                    '<%= base.dev %>/js/main.js': ['<%= base.src %>/js/main.js']
                }
            },
            dist: {
                options: {
                    // uglify
                    postBundleCB: function(err, src, next) {
                        if(!err) {
                            try {
                                // https://github.com/mishoo/UglifyJS2#the-simple-way
                                var result = UglifyJS.minify(src, {fromString: true});
                                next(null, result.code);
                            } catch(e) {
                                next(e);
                            }
                        } else {
                            grunt.log.writeln('uglify dist err:', err.stack);
                            throw err;
                        }
                    }
                },
                files: {
                    '<%= base.dist %>/js/main.js': ['<%= base.src %>/js/main.js']
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= base.dist %>/index.html': '<%= base.dist %>/index.html'
                }
            }
        }
    });

    grunt.registerTask('copySrcHtml', 'copy html file to dev or dist path', function(dir) {
        var done = this.async();
        var src = path.resolve(__dirname, 'client/src/index.html');
        var dest = path.resolve(__dirname, 'client/' + (dir || 'dev') + '/index.html');

        grunt.file.copy(src, dest);

        done();
    });

    grunt.registerTask('default', function() {
        grunt.task.run('clean:dev');
        grunt.task.run('copy:dev');
        grunt.task.run('jst');
        grunt.task.run('browserify:dev');
        grunt.task.run('compass');
        grunt.task.run('watch');
    });

    grunt.registerTask('release', function() {
        grunt.task.run('clean:tmp');
        grunt.task.run('clean:dist');
        // build css
        grunt.task.run('compass');
        // minify images & fonts
        if(!isWin) {
            grunt.task.run('imagemin');
        } else {
            grunt.task.run('copy:dist-img');
            grunt.task.run('copy:dist-fonts');
        }
        // grunt.task.run('copy:dist');
        grunt.task.run('copySrcHtml:dist');
        // build templates
        grunt.task.run('jst');
        // build js
        grunt.task.run('browserify:dist');
        grunt.task.run('useminPrepare');
        grunt.task.run('concat:generated');
        grunt.task.run('cssmin');
        grunt.task.run('uglify:generated');
        grunt.task.run('rev');
        grunt.task.run('usemin');
        grunt.task.run('clean:dist-main-js');
        // html mini
        // grunt.task.run('htmlmin');
    });

    grunt.registerTask('dev', ['default']);
    grunt.registerTask('dist', ['release']);
};
