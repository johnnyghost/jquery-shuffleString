module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },

      dist: {
        options: {
          beautify: false,
          compress: true,
          mangle: true,
          report: 'gzip'

        },
        files: {
          'dist/<%= pkg.name %>.min.js': ['src/jquery.shuffleString.js']
        }
      }
    },

    shell: {
        clean: {
          command: 'rm -r dist/*'
        }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['shell:clean', 'jshint', 'uglify']);
  grunt.registerTask('build', 'default');

};