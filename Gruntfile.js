'use strict';

var path = require('path');

module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        base: {
            'dev': 'client/dev',
            'dist': 'client/dist'
        },

        clean: {
            all: {
                src: ['<%= base.dist %>']
            },
            css: {
                src: ['<%= base.dist %>/css/{,*/}*.css']
            },
            js: {
                src: ['<%= base.dist %>/js/{,*/}*.js']
            },
            images: {
                src: ['<%= base.dist %>/images/{,*/}*.{png, jpg}']
            },
            fonts: {
                src: ['<%= base.dist %>/fonts/']
            }
        },

        copy: {
            css: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= base.dev %>/',
                    dest: '<%= base.dist %>/',
                    src: ['css/{,*/}*.min.css']
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= base.dev %>/',
                    dest: '<%= base.dist %>/',
                    src: ['fonts/{,*/}*.*']
                }]
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: '<%= base.dev %>/sass',
                    cssDir: '<%= base.dev %>/css'
                }
            },
            dist: {
                options: {
                    sassDir: '<%= base.dev %>/sass',
                    cssDir: '<%= base.dev %>/css',
                    outputStyle: 'compressed',
                    force: true,
                    environment: 'production',
                    assetCacheBuster: false,
                    relativeAssets: false
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
                        cwd: '<%= base.dev %>/images/',
                        src: ['**/*.{png, jpg, gif}'],
                        dest: '<%= base.dist %>/images/'
                    }
                ]
            }
        },

        jst: {
            compile: {
                options: {
                    // module: true,
                    // provider: 'lodash',
                    namespace: 'Tmpl',
                    processName: function(filename) {
                        var f = path.basename(filename, '.html');
                        return f.replace(/(?:_|-)(\w{1}?)/g, function(m) {
                            return m.toUpperCase().slice(1);
                        });
                    },
                    prettify: true,
                    // templateSettings: {
                    //     evaluate: /\{\{=(.+?)\}\}/g,
                    //     interpolate: /\{\{(.+?)\}\}/g,
                    //     escape: /\{\{-(.+?)\}\}/g
                    // },
                    processContent: function(src) {
                        return src
                            .replace(/\<\!\-\-[\s\S]*?\-\-\>/g, '') // remove comments
                            .replace(/(^\s+|\s+$)/gm, ''); // remove whitespaces
                    }
                },
                files: {
                    '<%= base.dev %>/js/tmpl.js': ['<%= base.dev %>/tmpl/*.html']
                }
            }
        },

        watch: {
            'dist-css': {
                files: ['<%= base.dev %>/sass/**/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            'dist-js': {
                files: [
                    '<%= base.dev %>/js/*.js',
                    // '!<%= base.dev %>/js/tmpl.js',
                    '!<%= base.dev %>/js/*.min.js'
                ],
                tasks: ['browserify:dev']
            },
            'dist-tmpl': {
                files: ['<%= base.dev %>/tmpl/*.html'],
                tasks: ['jst']
            },
            'dist-lib': {
                files: ['<%= base.dev %>/js/lib/*.js'],
                tasks: ['concat:dev']
            }
        },

        browserify: {
            dev: {
                options: {
                    debug: true
                },
                files: {
                    '<%= base.dev %>/js/main.min.js': ['<%= base.dev %>/js/main.js']
                }
            },
            dist: {
                files: {
                    '<%= base.dist %>/js/main.min.js': ['<%= base.dev %>/js/main.js']
                }
            }
        },

        concat: {
            dev: {
                src: [
                    '<%= base.dev %>/js/lib/jquery.js',
                    '<%= base.dev %>/js/lib/underscore.js',
                    // '<%= base.dev %>/js/lib/bootstrap.js',
                ],
                dest: '<%= base.dev %>/js/lib.min.js'
            }
        },

        uglify: {
            options: {
                compress: true,
                report: 'gzip',
                preserveComments: false/*,
                mangle: {
                    except: ['jQuery', 'Underscore']
                }*/
            },
            dist: {
                files: {
                    '<%= base.dist %>/js/lib.min.js': ['<%= base.dev %>/js/lib.min.js'],
                    '<%= base.dist %>/js/main.min.js': ['<%= base.dist %>/js/main.min.js']
                }
            }
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            images: {
                src: '<%= base.dist %>/images/*.{jpg,jpeg,gif,png,webp}'
            }
        },

        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'timestamp',
                            replacement: '<%= new Date().getTime() %>'
                        }
                    ]
                },
                files: [
                    {src: ['<%= base.dev %>/index.html'], dest: '<%= base.dist %>/index.html'}
                ]
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

    grunt.registerTask('default', function() {
        grunt.task.run('jst');
        // concat js lib files
        grunt.task.run('concat');
        grunt.task.run('browserify:dev');
        grunt.task.run('compass:dev');
        grunt.task.run('watch');
    });

    grunt.registerTask('release', function() {
        grunt.task.run('clean:all');
        // dist templates
        grunt.task.run('jst');
        // dist js
        grunt.task.run('browserify:dist');
        grunt.task.run('uglify');
        // minify css and copy
        grunt.task.run('compass:dist');
        // minify images
        grunt.task.run('imagemin');
        // minify fonts & css
        grunt.task.run('copy');
        // update image name by the md5 value
        // grunt.task.run('filerev');
        // update timestemp
        grunt.task.run('replace');
        // html mini
        grunt.task.run('htmlmin');
    });

    grunt.registerTask('dist', ['release']);
};
