// VARIAVEIS
var gulp = require ('gulp');

var pug = require('gulp-pug2');

var sass = require ('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

var uglify = require('gulp-uglify');

var image = require('gulp-image');

// TASKS
gulp.task('pug', function(){
  return gulp.src('./source/*.pug')
  .pipe(pug({locals: './source/*.pug'}))
  .pipe(gulp.dest('./dist/'))
})

gulp.task('sass', function(){
  return gulp.src('./source/sass/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./source/css/'))
})

gulp.task('minify', function(){
  return gulp.src('./source/css/*.css')
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('./dist/css/'))
})

gulp.task('uglify', function(){
  return gulp.src('./source/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'))
})

gulp.task('image', function(){
  return gulp.src('./source/images/*')
  .pipe(image())
  .pipe(gulp.dest('./dist/images/'))
})

// WATCH
gulp.task('watch', function(){
  gulp.watch(['./source/*.pug'],['pug']) // pug
  gulp.watch(['./source/sass/*.scss'],['sass']) // sass
  gulp.watch(['./source/css/*.css'],['minify']) // minify
  gulp.watch(['./source/js/*.js'],['uglify']) // uglify
})

// TASK PRINCIPAL
gulp.task('default',['image','watch']);
