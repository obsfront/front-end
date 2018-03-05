// VARIAVEIS
var gulp = require('gulp');

var pug = require('gulp-pug2');

var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

var uglify = require('gulp-uglify');

var image = require('gulp-image');
var connect = require('gulp-connect-multi')();

const libsJs = [
  'node_modules/jquery/jquery.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
];

// TASKS
gulp.task('connect', connect.server({
  root: ['dist'],
  port: 9000,
  livereload: true,
  open: {
    browser: 'chrome'
  }
}));

gulp.task('pug', function () {
  return gulp.src('./source/*.pug')
    .pipe(pug({ locals: './source/*.pug' }))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
})

gulp.task('copyfonts', function () {
  gulp.src('./source/fonticons/**')
    .pipe(gulp.dest('./dist/fonticons'));
})

gulp.task('sass', function () {
  return gulp.src('./source/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./source/css/'))
    .pipe(connect.reload());
})

gulp.task('minify', function () {
  return gulp.src('./source/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(connect.reload());
})

gulp.task('libs', function () {
  gulp.src(libsJs)
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('uglify', function () {
  return gulp.src('./source/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
})

gulp.task('image', function () {
  return gulp.src('./source/images/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/images/'))
    .pipe(connect.reload());
})

// WATCH
gulp.task('watch', function () {
  gulp.watch(['./source/*.pug'], ['pug']) // pug
  gulp.watch(['./source/sass/*.scss'], ['sass']) // sass
  gulp.watch(['./source/css/*.css'], ['minify']) // minify
  gulp.watch(['./source/js/*.js'], ['uglify']) // uglify
})

// TASK PRINCIPAL
gulp.task('default', ['image', 'libs', 'copyfonts', 'watch', 'connect']);
