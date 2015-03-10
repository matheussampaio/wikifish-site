var path = require('path');
var del = require('del');

var gulp = require('gulp');
var babel = require('gulp-babel');
var compass = require('gulp-compass');
var minifyCSS= require('gulp-minify-css');

var runSequence = require('run-sequence');

var dist = 'public';

var src = ['src/**/*.js'];

gulp.task('build-clean', function(cb) {
   del([
       'public/**'
   ], cb);
});

gulp.task('build-compass', function() {
    gulp.src('src/**/*.scss')
        .pipe(compass({
            project: __dirname,
            css: path.join(dist, 'stylesheets'),
            sass: 'src/stylesheets',
            require: ['compass/import-once/activate', 'bootstrap-sass']
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(dist));
});

gulp.task('build-convert-es6', function() {
    gulp.src(src)
        .pipe(babel())
        .pipe(gulp.dest(dist));
});

gulp.task('build', function() {
    runSequence('build-clean', ['build-convert-es6', 'build-compass']);
});