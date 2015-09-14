/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/web/reset.css',
  'styles/web/includes/entypo/style.css',
  'styles/web/includes/icomoon/style.css',
  'styles/web/includes/font_awesome/font-awesome.css',
  'styles/web/includes/cosy/style.css',
  'styles/web/**/*.css',
  'styles/web/animate.min.css',
  'styles/web/light.css'
];

var cssAdminFilesToInject = [
  'styles/admin/bootstrap/bootstrap.css',
  'styles/admin/libs/font-awesome.css',
  'styles/admin/libs/nanoscroller.css',
  'styles/admin/compiled/layout.css',
  'styles/admin/compiled/elements.css',
  'styles/admin/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  
  // Load sails.io before everything else
  'js/web/dependencies/sails.io.js',
  'js/web/dependencies/jquery-1.11.3.min.js',
  'js/web/dependencies/jquery-ui/jquery-ui.min.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/web/dependencies/**/*.js',
  'js/web/scripts.js'
];

var jsAdminFilesToInject = [
  'js/admin/dependencies/jquery.js',
  'js/admin/dependencies/bootstrap.js',
  'js/admin/dependencies/underscore-min.js',
  'js/admin/dependencies/backbone-min.js',
  'js/admin/dependencies/jquery.nanoscroller.min',
  'js/admin/dependencies/**/*.js',
  'js/admin/boot.js',
  'js/admin/models/**/*.js',
  'js/admin/app/**/*.js',
  'js/admin/**/*.js',
  'js/admin/scripts.js',
  'js/admin/app.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/web/**/*.html'
];
var templateAdminFilesToInject = [
  'templates/admin/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});

module.exports.cssAdminFilesToInject = cssAdminFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsAdminFilesToInject = jsAdminFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateAdminFilesToInject = templateAdminFilesToInject.map(function(path) {
  return 'assets/' + path;
});