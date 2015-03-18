var fs = require('fs');
var version = 'v' + JSON.parse(fs.readFileSync('package.json', 'utf8')).version;

var del = require('del');

var gulp = require('gulp');

var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var stylish = require('jshint-stylish');

var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var compass = require('gulp-compass');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var minifyCSS= require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var autoprefixer = require('gulp-autoprefixer');

/* ========= */
/* VARIABLES */
/* ========= */

var paths = {
    app: 'app',
    css: {
        dist: 'public/assets/css'
    },
    dist: 'public',
    images: {
        src: 'app/assets/images/*.png',
        dist: 'public/assets/images'
    },
    jade: {
        src: 'views'
    },
    js: {
        src: [
            'app/**/app.module.js',
            'app/**/app.config.js',
            'app/**/*.module.js',
            'app/**/*.js'
        ],
        dist: 'public'
    },
    sass: {
        src: 'app/assets/css'
    }
};

/* ================== */
/* ONLY FOR DEVELOPER */
/* ================== */

gulp.task('serve', function() {
    return runSequence('build', 'browser-sync');
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        files: [paths.dist + '/**/*.*'],
        port: 7000,
        open: false
    });

    gulp.watch(paths.sass.src + '/*.scss', ['build:scss']);
    gulp.watch(paths.images.src + '/*.scss', ['build:images']);
    gulp.watch(paths.js.src, ['build:js']);
    gulp.watch(paths.jade.src + '/**/*.jade').on('change', browserSync.reload);
});

gulp.task('nodemon', function (cb) {
    return nodemon({
        script: 'server.js',
        ext: 'js',
        ignore: [
            paths.app + '/**',
            paths.jade.src + '/**',
            paths.dist + '/**',
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
    return runSequence('build:clean', ['build:js', 'build:icons', 'build:images', 'build:scss']);
});

gulp.task('build:scss', function() {
    gulp.src(paths.sass.src + '/*.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(compass({
            project: __dirname,
            css: paths.css.dist,
            sass: paths.sass.src,
            require: ['compass/import-once/activate', 'bootstrap-sass']
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.css.dist));
});

gulp.task('build:images', function() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dist));
});

// just a icon hack
gulp.task('build:icons', function() {
    return gulp.src('app/assets/icons/**', {base:'app/assets/'})
        .pipe(gulp.dest('public/assets'));
});

gulp.task('build:js', function() {
    return gulp.src(paths.js.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(replace(/GULP_APP_VERSION/g, version))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(babel())
        .pipe(sourcemaps.init())
            .pipe(concat('bundle.min.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dist));
});

gulp.task('build:clean', function(cb) {
    del([
        paths.dist
    ], cb);
});


/*========*/
/* OTHERS */
/*========*/

// Gulp plumber error handler
var onError = function(err) {
    console.error(err.message);
    this.emit('end');
};