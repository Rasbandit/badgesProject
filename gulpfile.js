//npm install --save gulp gulp-concat gulp-sass gulp-sourcemaps gulp-print gulp-babel gulp-cachebust

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	// sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	print = require('gulp-print'),
	babel = require('gulp-babel');

var Cachebuster = require('gulp-cachebust');
var cachebust = new Cachebuster();


gulp.task('hello', function() {
	console.log('hello everybody')
});


gulp.task('build-css', [], function() {
	return gulp.src('./public/pages/**/*.css')
	.pipe(sourcemaps.init())
	// .pipe(cachebust.resources())
	.pipe(concat('styles.css'))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./dist'));
});

gulp.task('build-js', [], function() {
	return gulp.src(['./public/js/app.js', './public/js/userService.js', './public/js/indexCtrl.js', './public/pages/**/*.js', './public/js/badgeDirective.js'])
	.pipe(sourcemaps.init())
	// .pipe(print())
	.pipe(babel({presets: ['es2015']}))
	.pipe(concat('bundle.js'))
	//.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./dist/js'));
});

gulp.task('build-scripts', function(){
	return gulp.src('./public/css/**/*.*')
	.pipe(gulp.dest('./dist/css'));
});

gulp.task('move-images', function(){
	return gulp.src(['./public/images/**/*.png','./public/images/**/*.svg', './public/images/**/*.jpg', './public/images/**/*.gif'])
	.pipe(gulp.dest('./dist/images'))
});

gulp.task('move-fonts', function(){
	return gulp.src(['./public/**/*.woff','./public/**/*.woff2', './public/**/*.ttf'])
	.pipe(gulp.dest('./dist/fonts/roboto'))
});

gulp.task('move-html', function(){
	return gulp.src('./public/pages/**/*.html')
	.pipe(gulp.dest('./dist/pages'))
});

gulp.task('build', ['build-css', 'build-js', 'move-images', 'move-fonts', 'move-html', 'build-scripts'], function() {
	return gulp.src('./public/index.html')
	.pipe(cachebust.references())
	.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build'], function() {
	return gulp.watch(['./public/index.html', './public/**/*.html', './public/**/*.css', './public/**/*.js'], ['build']);
});