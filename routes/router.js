var EasyOrder = require("../app/controllers/user/user"),
        Admin = require("../app/controllers/admin/admin");


module.exports = function (app) {

    //登陆处理
    app.use(function(req,res,next){
        app.locals.user = req.session.user; // 将session中保存的用户名存储到本地变量中
        next();
    });

    // 公共路由
    app.get("/",EasyOrder.index);                      //首页首页
    app.post("/user/login",EasyOrder.login);         //登录接口
    app.get("/logout",EasyOrder.logout);
    app.get("/admin",EasyOrder.singinRequired,EasyOrder.adminRequired,Admin.index);           //管理员页面
    app.route("/admin/user_list").get(EasyOrder.singinRequired,EasyOrder.adminRequired,EasyOrder.user_list)//管理员页面
                                      .delete(EasyOrder.del);

    // development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        res.status(err.status || 404);
        res.render('404');
        next(err);
    });
};
