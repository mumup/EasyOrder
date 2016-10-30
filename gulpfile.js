// Modules dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var autofix = require('gulp-autoprefixer');
// var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var bs = browserSync.create('My server');
var nodemon = require('gulp-nodemon');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
var path = require('path');

// path 定义
var basedir = './';
var publicdir = './public';
var filepath = {
    'css': path.join(publicdir, 'css/**/*.css'),
    'scss': path.join(publicdir, 'sass/**/*.scss'),
    'js': path.join(publicdir, 'js/**/*.js'),
    'view': path.join(basedir,'views/**/*.jade')
};

// 编译 scss
gulp.task('css', function () {
    return gulp.src(path.join(publicdir,'sass/style.scss'))
        // .pipe(sourcemaps.init())
        .pipe(autofix())
        .pipe(sass().on('error', sass.logError))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join(publicdir,'css')))
        .pipe(bs.stream())
});

// dev server
// 启动 express 并添加 browserSync 支持
gulp.task('dev:server', function () {
    nodemon({
        script: 'bin/www',
        ignore: ['.vscode', '.idea', 'node_modules'],
        env: {
            'NODE_ENV': 'development'
        }
    })
    bs.init(null, {
        proxy: 'http://localhost:' + "3000",
        files: [filepath.js, filepath.view],
        // notify: false,
        open: true,
        port: 5000
    })
})



// 联调服务
gulp.task('api:server', function () {
    nodemon({
        script: 'server.js',
        ignore: ['.vscode', '.idea', 'node_modules'],
        env: {
            'NODE_ENV': 'api',
            'REMOTE_API': config.remoteApi
        }
    })
    bs.init(null, {
        proxy: 'http://localhost:' + config.port,
        files: [filepath.js, filepath.view],
        notify: false,
        open: false,
        port: 5000
    })
})

gulp.task('cssmin', function () {
    return gulp.src(path.join(publicdir,'css/main.css'))
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.join(publicdir,'css')))
})

gulp.task('jsmin', function () {
    return gulp.src(filepath.js)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.join(publicdir,'js')))
})

gulp.task('build', ['cssmin', 'jsmin'])

// watching
gulp.task('watch', function () {
    gulp.watch(filepath.scss, ['css'])
})

gulp.task('dev', ['dev:server', 'css', 'watch'])
gulp.task('api', ['api:server', 'css', 'watch'])