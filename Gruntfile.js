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
                '<%= config.web %>/js/*.js'
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
                        '<%= config.dist %>/js/gene.js': [
                            '<%= config.web %>/js/*.js'
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
                    '<%= config.dist %>/css/gene-min.css': [
                        'bower_components/font-awesome/css/font-awesome.css',
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
                            '**/*.{html,js,css}',
                            '**/*.{ico,png,txt,jpg,jpeg,gif}',
                            '.htaccess'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/font-awesome/fonts',
                        dest: '<%= config.dist %>/css/fonts',
                        src: [
                            '*'
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
            dist: {
                options: {
                    base: '<%= config.web %>',
                    livereload: false
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
        'connect:dist',
        'watch'
    ]);

    //build
    grunt.registerTask('build', [
        'clean:dist',
        'sass:dist',
        'jshint',
        'copy:dist',
        'autoprefixer:dist',
        'cssmin',
        'uglify',
        'useminPrepare',
        'usemin',
        'includereplace'
    ]);

    // Default task(s).
    grunt.registerTask('default');

};