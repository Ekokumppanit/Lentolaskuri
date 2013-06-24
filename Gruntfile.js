'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      less: {
        files: ['<%= yeoman.app %>/styles/*.less'],
        tasks: ['less']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/*.html',
          '{.tmp,<%= yeoman.app %>}/styles/*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
          '<%= yeoman.app %>/images/*.{png,jpg,jpeg,webp}'
        ],
        tasks: ['livereload']
      },
      handlebars: {
        files: [
          'app/templates/**/*.hbs'
        ],
        tasks: ['handlebars', 'livereload']
      }
    },
    handlebars: {
      compile: {
        files: {
          '.tmp/scripts/templates.js': [
            'app/templates/**/*.hbs'
          ]
        },
        options: {
          // namespace: false,
          amd: true,
          processName: function (filename) {
            return filename.replace(/^app\/templates\//, '').replace(/\.hbs/, '');
          }
        }
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'app')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/*.js'
      ]
    },
    less: {
      dist: {
        options: {
          paths: ['app/components'],
          yuicompress: true,
          strictUnits: false,
          strictMaths: false
        },
        files: {
          '.tmp/styles/main.css': '<%= yeoman.app %>/styles/main.less'
        }
      },
      server: {
        options: {
          paths: ['app/components'],
          strictUnits: false,
          strictMaths: false
        },
        files: {
          '.tmp/styles/main.css': '<%= yeoman.app %>/styles/main.less'
        }
      }
    },
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          // `name` and `out` is set by grunt-usemin
          baseUrl: 'app/scripts',
          paths: {
            'bootstrap': '../../.tmp/scripts/bootstrap',
            'Template': '../../.tmp/scripts/templates'
          },
          optimize: 'none',
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          //generateSourceMaps: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          include: [
            'libs/gmaps'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/*.html'],
      css: ['<%= yeoman.dist %>/styles/*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/*.css',
            '<%= yeoman.app %>/styles/*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'api/*',
            '*.{ico,txt}',
            '.htaccess',
          ]
        }, {
          expand: true,
          flatten: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>/font',
          src: [
            'components/font-awesome/font/*.{ttf,woff,otf,eot,svg}'
          ]
        }, {
          expand: true,
          flatten: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>/styles',
          src: [
            'components/select2/*.{png,gif}'
          ]
        }]
      },
      livereload: {
        files: [{
          expand: true,
          flatten: true,
          cwd: '<%= yeoman.app %>',
          dest: '.tmp/font',
          src: [
            'components/font-awesome/font/*.{ttf,woff,otf,eot,svg}'
          ]
        }, {
          expand: true,
          flatten: true,
          cwd: '<%= yeoman.app %>',
          dest: '.tmp/styles',
          src: [
            'components/select2/*.{png,gif}'
          ]
        }]
      }
    },
    bower: {
      all: {
        rjsConfig: '<%= yeoman.app %>/scripts/main.js'
      }
    },
    concat: {
      bootstrap: {
        src: [
          'app/components/bootstrap/js/bootstrap-transition.js',
          'app/components/bootstrap/js/bootstrap-alert.js',
          'app/components/bootstrap/js/bootstrap-button.js',
          'app/components/bootstrap/js/bootstrap-carousel.js',
          'app/components/bootstrap/js/bootstrap-collapse.js',
          'app/components/bootstrap/js/bootstrap-dropdown.js',
          'app/components/bootstrap/js/bootstrap-modal.js',
          'app/components/bootstrap/js/bootstrap-tooltip.js',
          'app/components/bootstrap/js/bootstrap-popover.js',
          'app/components/bootstrap/js/bootstrap-scrollspy.js',
          'app/components/bootstrap/js/bootstrap-tab.js',
          'app/components/bootstrap/js/bootstrap-typeahead.js',
          'app/components/bootstrap/js/bootstrap-affix.js'
        ],
        dest: '.tmp/scripts/bootstrap.js'
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'less:server',
      'handlebars',
      'concat',
      'copy:livereload',
      'livereload-start',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'less:dist',
    'handlebars',
    'concat',
    'useminPrepare',
    'requirejs',
    'imagemin',
    'htmlmin',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
