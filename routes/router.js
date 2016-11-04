var EasyOrder = require("../app/controllers/user/user");


module.exports = function (app) {

    //登陆处理
    app.use(function(req,res,next){
        app.locals.user = req.session.user; // 将session中保存的用户名存储到本地变量中
        next();
    });

    // 公共路由

    app.get('/',EasyOrder.index);
};
