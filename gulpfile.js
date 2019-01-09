/**
 * 2019年1月8日11:43:39
 * gulp 4.x rebuild
 * pmumu
 */

const { series } = require('gulp')
const path = require('path')
const browserSync = require('browser-sync').create()
const nodemon = require('gulp-nodemon')

// path 定义
const basedir = './'
const publicdir = './public'
const filepath = {
  'css': path.join(publicdir, 'css/**/*.css'),
  'scss': path.join(publicdir, 'sass/**/*.scss'),
  'js': path.join(publicdir, 'js/**/*.js'),
  'view': path.join(basedir, 'views/**/*.pug')
}

//  browser-sync 浏览器自刷新
function devSever (cb) {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: [filepath.js, filepath.view],
    // notify: false,
    open: true,
    port: 5000
  })
  cb()
}

//  123
function devNodeSync (cb) {
  nodemon({
    script: 'bin/www',
    ignore: ['.vscode', '.idea', 'node_modules'],
    env: {
      'NODE_ENV': 'development'
    }
  })
  cb()
}

exports.dev = series(devNodeSync, devSever)
