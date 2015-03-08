var path = require('path');

var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

var runSequence = require('run-sequence');

var nodemon = require('gulp-nodemon');

var dist = 'public';

var src = ['src/**/*.js'];

gulp.task('build-clean', function() {
   return gulp.src(dist, {read: false})
        .pipe(clean());
});

gulp.task('build-compass', function() {
    return gulp.src('src/**/*.scss')
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
    return gulp.src(src)
        .pipe(babel())
        .pipe(gulp.dest(dist));
});

gulp.task('compress', function() {
    return gulp.src(path.join(dist, '**/*.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist))
});

gulp.task('build', function() {
    runSequence('build-clean', 'build-convert-es6', 'build-compass');
});

gulp.task('develop', function () {
    nodemon({
            script: 'app.js',
            ext: 'scss js',
            env: { 'NODE_ENV': 'development' },
            ignore: ['public/**', '.sass-cache/**', 'node_modules/**'],
            nodeArgs: ['--debug']
        })
        .on('start', ['build'])
        .on('change', ['build']);
});