module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    paths: ["css"],
                    compress: false
                },
                files: {
                    'src/styles/main.less': 'dev/styles/main.css'
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/main.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        uglify: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/scripts/',
                    src: ['main.js'],
                    dest: 'dist/scripts',
                    ext: '.min.js'
                }]
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less', 'uglify']);
};