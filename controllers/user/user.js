var mongoose = require("mongoose"),
    User = mongoose.model("User");

// 登录控制器
exports.signin = function (req,res) {
    var user = req.query.user || "",
        _user = {};
    user = user.split("&");
    for(var i = 0 ;i < user.length; i++){
        var p = user[i].indexOf("="),
            name = user[i].substring(0,p),
            value = user[i].substring(p + 1);
        _user[name] = value;
    }
    var _name = _user.name || "",
        _password = _user.password ||"";

    User.findOne({name:_name},function (err,user) {
        if (err){
            console.log(err);
        }
        if (!user){
            return res.json({status:0,data:"\u7528\u6237\u4e0d\u5b58\u5728"});//用户不存在
        }

        //user实例进行密码比对
        user.comparePassword(_password,function (err,isMatch) {
            if (err){
                console.log(err);
            }

            if (isMatch){
                req.session.user = user;      //保存当前用户名到cookie
                return res.json({status:3,data:"\u767b\u5f55\u6210\u529f"});  //登录成功
            }else {
                //账户密码不匹配
                return res.json({status:1,data:"\u5bc6\u7801\u9519\u8bef"});  //密码错误
            }
        });
    });
};

//登出

exports.logout = function(req,res) {
    delete req.session.user;
    res.redirect('/');
};

// 判断用户是否登录中间件
exports.singinRequired = function (req,res,next) {
    var _user = req.session.user;
    if(!_user){
        return res.redirect("/");
    }
    next();
};

//用户权限中间件
/* 用户权限中间件 */
exports.adminRequired = function(req,res,next) {
    var _user = req.session.user;
    if(_user && _user.role <= 10){
        return res.redirect("/");
    }
    next();
};