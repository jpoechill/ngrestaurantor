// Gulp build, workflow
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var autoprefixer = require('gulp-autoprefixer');
var browsersync = require('browser-sync');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

// DEVELOPMENT TASKS
// -----------------

// Sass
gulp.task('sass', function () {
  return gulp.src('dev/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dev/css'))
    .pipe(bs.reload({ // Reloading with Browser Sync
      stream: true
    }));
});

// Set up browser-sync
var bs = require('browser-sync').create(); // create a browser sync instance.
gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "dev"
        }
    });
});

// Watching
gulp.task('watch', function () {
    gulp.watch("dev/scss/*.scss", ['sass']);
    gulp.watch("dev/*.html").on('change', bs.reload);
    gulp.watch("dev/js/*.js").on('change', bs.reload);
});

// PRODUCTION TASKS
// ----------------

// Optimize images
gulp.task('images', function() {
  return gulp.src('dev/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
        interlaced: true
    })))
    .pipe(gulp.dest('dist/img'));
});

// Clean up dist
// gulp.task('clean', function() {
//   return del.sync('dist').then(function(cb) {
//     return cache.clearAll(cb);
// });

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Useref
gulp.task('useref', function(){
  return gulp.src('dev/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Build Sequences
// ---------------

// Defaults
gulp.task('default', function (callback) {
  runSequence(['sass', 'browser-sync', 'watch']),
  callback
});

gulp.task('build', function(callback) {
    runSequence('clean:dist',
        ['sass', 'useref', 'images'],
        callback
    )
});