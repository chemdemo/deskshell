'use strict';

module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        base: {
            'dev': 'client/dev',
            'build': 'client/build'
        },

        clean: {
            all: {
                src: ['<%= base.build %>']
            },
            css: {
                src: ['<%= base.build %>/css/{,*/}*.css']
            },
            js: {
                src: ['<%= base.build %>/js/{,*/}*.js']
            },
            images: {
                src: ['<%= base.build %>/images/{,*/}*.{png, jpg}']
            },
            fonts: {
                src: ['<%= base.build %>/fonts/']
            }
        },

        copy: {
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= base.dev %>/',
                    dest: '<%= base.build %>/',
                    src: ['fonts/{,*/}*.*']
                }]
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: '<%= base.dev %>/sass',
                    cssDir: '<%= base.dev %>/sass'
                }
            },
            dist: {
                options: {
                    sassDir: '<%= base.dev %>/sass',
                    cssDir: '<%= base.build %>/css',
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
            dynamic: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= base.dev %>/images/',
                        src: ['**/*.{png, jpg, gif}'],
                        dest: '<%= base.build %>/images/'
                    }
                ]
            }
        },

        watch: {
            'build-css': {
                files: ['<%= base.dev %>/sass/**/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            'build-js': {
                files: ['<%= base.dev %>/js/*.js', '!<%= base.dev %>/js/main.js'],
                tasks: ['browserify:dev']
            }
        },

        browserify: {
            dev: {
                options: {
                    debug: true,
                    ignore: ['<%= base.dev %>/js/main.js']
                },
                files: {
                    '<%= base.dev %>/js/main.js': ['<%= base.dev %>/js/initialize.js']
                }
            },
            dist: {
                options: {
                    ignore: ['<%= base.build %>/js/main.js']
                },
                files: {
                    '<%= base.build %>/js/main.js': ['<%= base.dev %>/js/initialize.js']
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                files: {
                    '<%= base.build %>/js/main.js': ['<%= base.build %>/js/main.js']
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
                src: '<%= base.build %>/images/*.{jpg,jpeg,gif,png,webp}'
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
                    {src: ['<%= base.dev %>/index.html'], dest: '<%= base.build %>/index.html'}
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
                    '<%= base.build %>/index.html': '<%= base.build %>/index.html'
                }
            }
        }
    });

    grunt.registerTask('default', function() {
        grunt.task.run('browserify:dev');
        grunt.task.run('compass:dev');
        grunt.task.run('watch');
    });

    grunt.registerTask('release', function() {
        grunt.task.run('clean:all');
        // build js
        grunt.task.run('browserify:dist');
        grunt.task.run('uglify:dist');
        // minify css and copy
        grunt.task.run('compass:dist');
        // minify images
        grunt.task.run('imagemin');
        // minify fonts
        grunt.task.run('copy:fonts');
        // update image name by the md5 value 
        // grunt.task.run('filerev');
        // update timestemp
        grunt.task.run('replace');
        // html mini
        grunt.task.run('htmlmin');
    });
};
