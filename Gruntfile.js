/**
 * Created by Administrator on 2017/10/16.
 */

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            web: 'web',
            dist: 'dist'
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.dist %>/*'
                    ]
                }]
            }
        },
        includereplace: {
            dist: {
                options: {
                    prefix: '@@',
                    suffix: '',
                    wwwroot: './',
                    globals: {
                        webapi: global.webapi,
                        DEBUG: 1,
                        BUILD: new Date().getTime()
                    },
                    includesDir: '',
                    docroot: '.'
                },
                src: '<%= config.dist %>/**/*.{js,html}',
                dest: './'
            }
        },
        jshint: {
            dist: [
                '<%= config.web %>/js/*.js',
                '!<%= config.web %>/js/echarts.min.js',
            ]
        },
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.web %>/index.html'
        },
        usemin: {
            html: ['<%= config.dist %>/**/*.html']
        },
        uglify: {
            dist: {
                files: [
                    {
                        '<%= config.dist %>/js/gene.min.js': [
                            '<%= config.dist %>/js/gene.js'
                        ]
                    }
                ]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: false
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.web %>/scss/',
                        src: ['*.scss'],
                        dest: '<%= config.web %>/css/',
                        ext: '.css'
                    }
                ]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.web %>/',
                        src: 'css/*.css',
                        dest: '<%= config.web %>/'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= config.dist %>/css/gene.min.css': [
                        '<%= config.dist %>/css/gene.css'
                    ]
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.web %>',
                        dest: '<%= config.dist %>',
                        src: [
                            '**/*.{html,js,css}'
                        ]
                    }
                ]
            }
        },
        watch: {
            scripts: {
                files: ['<%= config.web %>/js/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: ['<%= config.web %>/scss/*.scss'],
                tasks: ['sass', 'autoprefixer']
            },
            styles: {
                files: ['<%= config.web %>/css/*.css'],
                tasks: ['autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.web %>/*.html'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                open: false,
                livereload: 35729,
                hostname: '*'
            },
            livereload: {
                options: {
                    base: '<%= config.web %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-usemin');

    //server
    grunt.registerTask('server', [
        'sass:dist',
        'autoprefixer:dist',
        'connect:livereload',
        'watch'
    ]);

    //build
    grunt.registerTask('build', [
        'clean:dist',
        'sass:dist',
        //'jshint',
        'copy:dist',
        'autoprefixer:dist',
        'cssmin',
        'uglify'
    ]);

    // Default task(s).
    grunt.registerTask('default');

};