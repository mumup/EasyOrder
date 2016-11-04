var EasyOrder = require("../app/controllers/user/user");


module.exports = function (app) {

    //登陆处理
    app.use(function(req,res,next){
        app.locals.user = req.session.user; // 将session中保存的用户名存储到本地变量中
        next();
    });

    // 公共路由

    app.get('/',EasyOrder.index);


    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        res.status(err.status || 404);
        // res.render('404');
        next(err);
    });
};
