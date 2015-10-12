var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
  watch = require('gulp-watch');

gulp.task('minify', function () {
   gulp.src('js/app.js')
      .pipe(uglify())
      .pipe(gulp.dest('build'))
});

gulp.task('vendor', function () {
   return gulp.src('./public/vendor/*.js')
      //.pipe(jshint())
      //.pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest('./assets/'));
});

gulp.task('js', function () {
   return gulp.src('./asests/js/*.js')
      //.pipe(jshint())
      //.pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./public/js'));
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
		.pipe(sass({
			// includePaths: require('node-neat').with('other/path', 'another/path')
			// - or -
			includePaths: require('node-neat').includePaths
		}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('vendor-sass', function () {
  gulp.src('./public/bower/**/*.scss')
    .pipe(sass())
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('em-js', function () {
   return gulp.src('./public/js/em/**/*.js')
      //.pipe(jshint())
      //.pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('em.js'))
      .pipe(gulp.dest('./public/dist/'));
});

gulp.task('em-sass', function () {
  gulp.src('./public/js/em/**/*.scss')
    .pipe(sass())
    .pipe(concat('em.css'))
    .pipe(gulp.dest('./public/dist/'));
});
gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['sass']);
});


gulp.task('default', ['sass', 'em-js', 'em-sass', 'watch'], function() {
  // place code for your default task here
});
