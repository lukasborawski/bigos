/*
 -------------------------------------------------
 Before you run gulp tasks fire up node modules
 packages installer. Type in your local console
 '$ sudo npm install' just as gulp task instruction,
 in your main project directory.
 -------------------------------------------------
 Include Gulp
 -------------------------------------------------
 */
var gulp = require('gulp');
/*
 -------------------------------------------------
 Include Plugins
 -------------------------------------------------
 */
var async = require('async');
// SASS, Styles Plugins
var sass = require('gulp-ruby-sass');
var minify = require('gulp-minify-css');
/*
 -------------------------------------------------
 Paths
 -------------------------------------------------
 */
var sass_src = 'src/style/scss/',
    style_src = 'src/style/',
    test_style_src = 'test/';
/*
 -------------------------------------------------
 Tasks
 -------------------------------------------------
 */
// SASS, Style Tasks
gulp.task('sass', function () {
    gulp.src([sass_src + 'style.scss'])
        .pipe(sass())
        .pipe(gulp.dest(style_src));
});
gulp.task('sass-test', function () {
    gulp.src([sass_src + 'style.scss'])
        .pipe(sass())
        // .pipe(minify({ keepBreaks: false }))
        .pipe(gulp.dest(test_style_src));
});
gulp.task('minify', function() {
    gulp.src([style_src + '/style.css'])
        .pipe(minify({ keepBreaks: false }))
        .pipe(gulp.dest(style_src))
});
/*
 -------------------------------------------------
 Watchers
 -------------------------------------------------
 */
gulp.task('watch', function() {
    gulp.watch(sass_src + '*.scss');
});
/*
 -------------------------------------------------
 Production Builder
 -------------------------------------------------
 Start this task only on your production instance.
 The task will minify your generated style file .
 -------------------------------------------------
 */
gulp.task('prod', function() {
    var tasks = ['sass', 'minify'];
    var sync = tasks.map(function(task) {
        return function(callback) {
            gulp.start(task, function(err) {
                callback(err);
            });
        };
    });
    async.series(sync);
});
/*
 -------------------------------------------------
 Default Dev Builder
 -------------------------------------------------
 */
gulp.task('default, dev', function() {
    var tasks = ['sass', 'watch'];
    var sync = tasks.map(function(task) {
        return function(callback) {
            gulp.start(task, function(err) {
                callback(err);
            });
        };
    });
    async.series(sync);
});
/*
 -------------------------------------------------
 Bigos Tests Builder (only for framework tests)
 -------------------------------------------------
 */
gulp.task('test', function() {
    var tasks = ['sass-test', 'watch'];
    var sync = tasks.map(function(task) {
        return function(callback) {
            gulp.start(task, function(err) {
                callback(err);
            });
        };
    });
    async.series(sync);
});