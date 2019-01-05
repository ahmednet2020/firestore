'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browserify = require('browserify');
const tsify = require("tsify");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const ts = (cd) => {
  return browserify({
    entries: ['./src/index.ts'],
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
const server = (cd) => {
  require('./server.js')
  cd()
}
gulp.watch('./src/**/*.ts',ts);
exports.default = gulp.series(ts, server)