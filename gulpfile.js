'use strict';
//Rebuild by pmumu in 2016年10月18日
//引入gulp插件以
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    auto_fix = require('gulp-autoprefixer'),
    gulpif = require('gulp-if'),
    reload = browserSync.reload,
    minimist = require('minimist');


//从watch中拿到更改的css路径
var css_path = "";


//装X文档
var info = "-------------------------------------\n" +
    "           装逼动力源自Intel          \n" +
    "------------------------------------- \n" +
    "          Web前端,从入门到经商        \n" +
    "-------------------------------------\n" +
    "    天展网络pmumu By 2016年10月18日  \n" +
    "-------------------------------------\n";

//路径

var path = {
    mobile: {
        "_css": "app/public/mobile/css",
        "css": "app/public/mobile/css/*.css",
        "sass": "app/public/mobile/sass/*.scss",
        "html": "app/tpl/mobile/**/*.html",
        "js": "app/public/mobile/js/*.js"
        // "img":"app/public/mobile/index_img/**",
        // "global_js":"app/public/mobile_global/*.js"
    },
    pc: {
        "_css": "app/public/indexs/css",
        "css": "app/public/**/*.css",
        "html": "app/tpl/**/*.html",
        "js": "app/public/indexs/js/*.js"
    }
};


//定义从控制面板获取的设置

var Options = {
    string: 'cwq',//后缀参数
    default: {cwq: process.env.NODE_ENV || 'pc'}//默认为PC端
};

var options = minimist(process.argv.slice(2), Options);


//检查命令行传参，返回path
// var Client = options.cwq == 'pc'?path.pc:path.mobile;

// var config = {
//          _pc:"cwq.cn",
//      _mobile:"pl.com",
//         port:"3000",
//     auto_fix:false,
//      browser: "chrome",
//          Url:options.cwq == 'pc'?this._pc:this._mobile,
//       Client:options.cwq == 'pc'?path.pc:path.mobile
// };

if (options.cwq == 'm') {
    var config = {
        url: "pl.com",         //移动端项目Url地址
        auto_fix: true,            //前缀美化,默认关闭
        browser: "chrome",         //browserSync默认浏览器
        port: "3000"            //browserSync端口,默认3000
    };
    var Client = path.mobile
} else {
    var config = {
        url: "cwq.cn",         //项目Url地址
        auto_fix: true,            //前缀美化,默认关闭
        browser: "chrome",         //browserSync默认浏览器
        port: "3000"            //browserSync端口,默认3000
    };
    var Client = path.pc
}


//默认启动项
gulp.task('default', ['watch','sass', 'bs'], function () {
    // console.log(options.cwq);
    console.log(info);
    // console.log(Client);
});

//帮助文档
gulp.task('help', function () {

    console.log('	gulp --cwq pc			PC端项目');

    console.log('	gulp --cwq m	       移动端项目');
});


//browser-sync
gulp.task("bs", function () {
    browserSync.init(
        {
            proxy: config.url,
            browser: config.browser,
            port: config.port
        });
});

//sass转换
gulp.task('sass', function () {
    return gulp.src([path.mobile.sass, '!app/public/mobile/sass/base.scss', '!app/public/mobile/sass/mixin.scss'])
        .pipe(auto_fix({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(sass())//sass转换
        .pipe(gulp.dest('app/public/mobile/css'))
        // .pipe(browserSync.stream({match: "**/*.css"}));
});


// css私有前缀
gulp.task('css', function () {
    return gulp.src(css_path)
    // .pipe(auto_fix({
    //     browsers: ['last 2 versions', 'Android >= 4.0'],
    //     cascade: false, //是否美化属性值 默认：true 像这样：
    //     //-webkit-transform: rotate(45deg);
    //     //        transform: rotate(45deg);
    //     remove:false //是否去掉不必要的前缀 默认：true
    // }) )
    // .pipe(gulp.dest(Client._css))
        .pipe(browserSync.stream())
});

// watch
gulp.task('watch', function () {
    gulp.watch(Client.sass,['sass']).on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');//sass变化监控
    });

    gulp.watch(Client.css, ['css']).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');//css变化监控
        css_path = '';
        css_path += event.path;
    });

    gulp.watch(Client.js).on('change', browserSync.reload);//js变化重载

    gulp.watch(Client.html).on('change', browserSync.reload);//html变化重载

});

