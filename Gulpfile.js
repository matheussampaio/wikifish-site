var path = require('path');
var del = require('del');

var gulp = require('gulp');

var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var stylish = require('jshint-stylish');

var jade = require('gulp-jade');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var minifyCSS= require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var autoprefixer = require('gulp-autoprefixer');
var templateCache = require('gulp-angular-templatecache');


/* ========= */
/* VARIABLES */
/* ========= */

var distJS = 'public'
var srcJS = [
    'src/**/app.module.js',
    'src/**/app.config.js',
    'src/**/*.module.js',
    'src/**/*.js'
];

var distCSS = 'public/stylesheets';
var srcCSS = [
    'src/**/*.scss'
];

var distJade = 'public/templates';
var srcJade = [
    'views/**/*.jade'
];




/* ================== */
/* ONLY FOR DEVELOPER */
/* ================== */

gulp.task('serve', function() {
    return runSequence('build', 'browser-sync');
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        files: ['public/**/*.*'],
        port: 7000,
        open: false
    });

    gulp.watch(srcCSS, ['build:scss']);
    gulp.watch(srcJS, ['build:js']);
    gulp.watch(srcJade).on('change', browserSync.reload);
});

gulp.task('nodemon', function (cb) {
    return nodemon({
        script: 'server.js',
        ext: 'js',
        ignore: [
            'src/**', 
            'views/**', 
            'public/**', 
            'node_modules/**'
        ]
    }).on('start', function () {
        cb();
    });
});

/* ========== */
/* PRODUCTION */
/* ========== */

gulp.task('build', function() {
    return runSequence('build:clean', ['build:js', 'build:scss']);
});

gulp.task('build:scss', function() {
    gulp.src(srcCSS)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
        }}))
        .pipe(compass({
            project: __dirname,
            css: 'public/stylesheets',
            sass: 'src/stylesheets',
            require: ['compass/import-once/activate', 'bootstrap-sass']
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public'));
});


gulp.task('build:js', function() {
    return gulp.src(srcJS)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
        }}))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(babel())
        .pipe(sourcemaps.init())
            .pipe(concat('bundle.min.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distJS));
});



gulp.task('build:templates', ['build:jade'], function () {
    gulp.src(distJade + '/**/*.html')
        .pipe(templateCache())
        .pipe(gulp.dest('public'));
});

gulp.task('build:jade', function() {
    gulp.src(srcJade)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(distJade))
});


gulp.task('build:clean', function(cb) {
    del([
        'public/**'
    ], cb);
});
