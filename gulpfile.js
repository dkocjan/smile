let gulp = require('gulp')
let browserSync = require('browser-sync')
let scss = require('gulp-sass')
let path = require('path')
let sourcemaps = require('gulp-sourcemaps')
let autoprefixer = require('gulp-autoprefixer')
let cleanCSS = require('gulp-clean-css')
let uglify = require('gulp-uglify')
let concat = require('gulp-concat')
let imagemin = require('gulp-imagemin')
let changed = require('gulp-changed')
let htmlReplace = require('gulp-html-replace')
let htmlMin = require('gulp-htmlmin')
let del = require('del')
let sequence = require('run-sequence')

let config = {
  dist:          'dist/',
  src:           'www/',
  cssin:         'www/css/**/*.css',
  jsin:          'www/js/**/*.js',
  imgin:         'www/img/**/*.{jpg,jpeg,png,gif}',
  htmlin:        'www/*.html',
  scssin:        'www/scss/styles.scss',
  scssdest:      'www/scss/**/*.scss',
  cssout:        'dist/css/',
  jsout:         'dist/js/',
  imgout:        'dist/img/',
  htmlout:       'dist/',
  scssout:       'www/css/',
  cssoutname:    'styles.css',
  jsoutname:     'script.js',
  cssreplaceout: 'css/styles.css',
  jsreplaceout:  'js/script.js'
}

gulp.task('reload', function () {
  browserSync.reload()
})

gulp.task('serve', [ 'scss' ], function () {
  
  browserSync({
    server: config.src
  })
  
  gulp.watch([
    config.htmlin,
    config.jsin
  ], [ 'reload' ])
  gulp.watch(config.scssdest, [ 'scss' ])
})

gulp.task('scss', function () {
  return gulp.src(config.scssin)
    .pipe(sourcemaps.init())
    .pipe(scss().on('error', scss.logError))
    .pipe(autoprefixer({
      browsers: [ 'last 3 versions' ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scssout))
    .pipe(browserSync.stream())
})

gulp.task('css', function () {
  return gulp.src(config.cssin)
    .pipe(concat(config.cssoutname))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.cssout))
})

gulp.task('js', function () {
  return gulp.src(config.jsin)
    .pipe(concat(config.jsoutname))
    .pipe(uglify())
    .pipe(gulp.dest(config.jsout))
})

gulp.task('img', function () {
  return gulp.src(config.imgin)
    .pipe(changed(config.imgout))
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgout))
})

gulp.task('html', function () {
  return gulp.src(config.htmlin)
    .pipe(htmlReplace({
      'css': config.cssreplaceout,
      'js':  config.jsreplaceout
    }))
    .pipe(htmlMin({
      sortAttributes:     true,
      sortClassName:      true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(config.dist))
})

gulp.task('clean', function () {
  return del([ config.dist ])
})

gulp.task('build', function () {
  sequence('clean', [
    'html',
    'js',
    'css',
    'img'
  ])
})

gulp.task('default', [ 'serve' ])
