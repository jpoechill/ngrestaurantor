var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browsersync = require('browser-sync');
var uglifycss = require('gulp-uglifycss');
var concatCss = require('gulp-concat-css');

//script paths
var jsFiles = 'js/**/*.js',
    jsDest = 'dist/scripts';

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

//sass
gulp.task('sass', function () {
  gulp.src('scss/**/*.scss')
    .pipe(concatCss("bundle.min.css"))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dist/css/'));
});

//browser-sync
var bs = require('browser-sync').create(); // create a browser sync instance.
gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

//watching
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', bs.reload);
});

//default
gulp.task('default', ['watch', 'sass', 'scripts'], function () {
  gulp.watch('sass/**/*.scss', ['sass']);
});