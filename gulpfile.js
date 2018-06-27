var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    cssshrink = require('gulp-cssshrink'),
    cp = require('child_process'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    size = require('gulp-size'),
    ghPages = require('gulp-gh-pages'),
    spritesmith = require('gulp.spritesmith')
    webpack = require('webpack-stream')
    webpackConfig = require('./webpack.config.js');

gulp.task('styles', ['sprite'], function() {
  gulp.src('./src/sass/screen.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 5 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts', function() {
  return gulp.src('./src/javascripts/app.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    // .pipe(concat('app.js'))
    .pipe(gulp.dest('public/javascripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'))
    .pipe(browserSync.reload({stream:true}));
});

// Optimizes the images that exists
gulp.task('images', function () {
  return gulp.src('public/images/**')
    .pipe(imagemin([imagemin.optipng({
      optimizationLevel: 7,
      bitDepthReduction: true,
      colorTypeReduction: true,
      paletteReduction: true
    })]))
    .pipe(gulp.dest('public/images'))
    .pipe(size({title: 'images'}));
});


gulp.task('sprite', function () {
  var spriteData = gulp.src('src/images/*.png').pipe(spritesmith({
    imgName: '../images/sprite.png',
    cssName: 'sprite.scss'
  }));
  spriteData.img.pipe(gulp.dest('public/images/'));
  spriteData.css.pipe(gulp.dest('src/sass'));
});

gulp.task('html', function() {
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('public/'))
});

gulp.task('browser-sync', ['styles', 'scripts'], function() {
  browserSync({
    server: {
      baseDir: "./public/",
      injectChanges: true // this is new
    }
  });
});

gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

gulp.task('watch', function() {
  // Watch .html files
  gulp.watch('src/**/*.html', ['html', browserSync.reload]);
  gulp.watch("public/*.html").on('change', browserSync.reload);
  // Watch .sass files
  gulp.watch(['src/sass/**/*.scss', '!src/sass/sprite.scss', 'src/images/*.*'], ['styles', browserSync.reload]);
  // Watch .js files
  gulp.watch('src/javascripts/*.js', ['scripts', browserSync.reload]);
  // Watch image files
  // gulp.watch('src/images#<{(||)}>#*', ['sprite', browserSync.reload]);
});

gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'html', 'browser-sync', 'watch');
});
