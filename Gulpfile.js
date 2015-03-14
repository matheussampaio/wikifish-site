var path = require('path');
var del = require('del');

var gulp = require('gulp');

var runSequence = require('run-sequence');
var stylish = require('jshint-stylish');

var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');
var minifyCSS= require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var autoprefixer = require('gulp-autoprefixer');

var dist = 'public';

var src = [
    'src/**/app.module.js',
    'src/**/app.config.js',
    'src/**/*.module.js',
    'src/**/*.js'
];

gulp.task('build:clean', function(cb) {
   del([
       'public/**'
   ], cb);
});

gulp.task('build:scss', function() {
    gulp.src('src/**/*.scss')
        .pipe(compass({
            project: __dirname,
            css: path.join(dist, 'stylesheets'),
            sass: 'src/stylesheets',
            require: ['compass/import-once/activate', 'bootstrap-sass']
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(dist));
});

gulp.task('build:js', function() {
   return gulp.src(src)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(babel())
        .pipe(sourcemaps.init())
            .pipe(concat('bundle.min.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist));
});

gulp.task('build', function() {
    return runSequence('build:clean', ['build:js', 'build:scss']);
});