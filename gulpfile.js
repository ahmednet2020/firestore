'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browserify = require('browserify');
const tsify = require("tsify");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const autoprefixer = require('autoprefixer');
const ts = (cd) => {
  return browserify({
    entries: ['./src/ts/index.ts'],
    debug: true
  }).plugin(tsify)
    .transform(babelify,{
      presets: ["@babel/preset-env"],
      extensions: [".babel",".ts"]
    })
    .bundle()
    .on('error', err => console.log(`browserify ${err}`))
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/js/'));
    cd();
}
const css = (cd) => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .on('error', plugins.sass.logError)
    .pipe(plugins.postcss([autoprefixer({browsers: 'last 2 versions'})]))
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css/'));
  cd()
}
const server = (cd) => {
  require('./server.js')
  cd()
}
gulp.watch('./src/ts/**/*.ts',ts);
gulp.watch('./src/sass/**/*.s?ss',css);
exports.default = gulp.series(ts, css, server)