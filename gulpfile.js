var gulp    = require('gulp');
var sync    = require('run-sequence');
var browser = require('browser-sync');
var webpack = require('webpack-stream');
var todo    = require('gulp-todoist');
var path    = require('path');
var yargs   = require('yargs').argv;
var tpl     = require('gulp-template');
var rename  = require('gulp-rename');
var mocha   = require('gulp-mocha');

/*
map of paths for using with the tasks below
 */
var paths = {
  entry: 'client/app/app.js',
  app: ['client/app/**/*.{js,styl,html}', 'client/style/**/*.styl'],
  js: 'client/app/**/*!(.spec.js).js',
  styl: ['client/app/**/*.styl', 'client/style/**/*.styl'],
  toCopy: ['client/index.html'],
  html: ['client/index.html', 'client/app/**/*.html'],
  dest: 'dist',
  blankTemplates: { 
    component: 'templates/component/*.**',
    directive: 'templates/directive/*.**'
  },
  test: ['test/**/*.js']
};

// helper funciton
var resolveToComponents = function(glob){
  glob = glob || '';
  return path.join('client', 'app/components', glob); // app/components/{glob}
};

var resolveToDirectives = function(glob){
  glob = glob || '';
  return path.join('client', 'app/directives', glob); // app/components/{glob}
};

gulp.task('todo', function() {
  return gulp.src(paths.js)
    .pipe(todo({silent: false, verbose: true}));
});

gulp.task('build', ['todo'], function() {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('serve', function() {
  browser({
    port: process.env.PORT || 4500,
    open: false,
    ghostMode: false,
    server: {
      baseDir: 'dist'
    }
  });
});

/*
simple task to copy over needed files to dist
 */
gulp.task('copy', function() {
  return gulp.src(paths.toCopy, { base: 'client' })
    .pipe(gulp.dest(paths.dest));
});

/*
task to watch files for changes and call build and copy tasks
 */
gulp.task('watch', function() {
  gulp.watch(paths.app, ['build', browser.reload]);
  gulp.watch(paths.toCopy, ['copy', browser.reload]);
});

gulp.task('component', function(){
  var cap = function(val){
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  var name = yargs.name;
  var parentPath = yargs.parent || '';
  var destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.blankTemplates.component)
    .pipe(tpl({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename(function(path){
      path.basename = path.basename.replace('component', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('directive', function(){
  var cap = function(val){
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  var name = yargs.name;
  var parentPath = yargs.parent || '';
  var destPath = path.join(resolveToDirectives(), parentPath, name);

  return gulp.src(paths.blankTemplates.directive)
    .pipe(tpl({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename(function(path){
      path.basename = path.basename.replace('directive', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('test', function(){
  return gulp.src('test/integration/apiprojects.js')
    .pipe(mocha({reporter: 'nyan'}));
}); 


gulp.task('default', function(done) {
  sync('build', 'copy', 'serve', 'watch', done)
});