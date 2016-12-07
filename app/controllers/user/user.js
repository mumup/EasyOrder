var mongoose = require("mongoose"),
    User = mongoose.model("User");


// 登录控制器
exports.login = function (req,res) {
    var _name = req.body.user || "",
     _password = req.body.password || "";

    User.findOne({account:_name},function (err,user) {
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


//用户注册
/* 用户注册控制器 */
exports.signup = function(req,res) {
    var user = req.body.user;                       // 获取post请求中的用户数据
    var password = req.body.password;
    var name = req.body.name;
    var role = req.body.role || "0";

    var _user = {
        account:user,
        password:password,
        name:name,
        role:role
    };
    console.log(_user);
    // 使用findOne对数据库中user进行查找
    User.findOne({account:user},function(err,account) {
        if(err) {
            console.log(err);
        }
        // 如果用户名已存在
        if(account) {
            return res.json({status:0,data:0});
        }

        // 数据库中没有该用户名，将其数据生成新的用户数据并保存至数据库
        user = new User(_user);            // 生成用户数据
        user.save(function(err) {
            if(err){
                console.log(err);
            }

            // req.session.user = user;         // 将当前登录用户名保存到session中
            return res.json({status:2,data:2,id:user._id});       // 注册成功
        });
    });
};

/* 用户修改控制器 */
exports.update = function (req,res) {




};



/* 用户删除控制器 */
exports.del = function(req,res) {
    // 获取客户端Ajax发送的URL值中的id值
    var id  = req.query.id;

    User.findOne({_id:id},function (err,user) {
        if(user) {
            //判断用户权限,超管不能删
            if(user.role>= 999){return res.json({status:0,msg:"不能删掉超管"})}


            // 如果id存在则服务器中将该条数据删除并返回删除成功的json数据
            User.remove({_id:id},function(err) {
                if(err){
                    console.log(err);
                }
                res.json({status:1,msg:"删除成功"});              // 删除成功
            });
        }
    });

};


// 用户列表
/* 用户列表页面渲染控制器 */
exports.user_list = function(req,res) {
    User.find({})
        .exec(function(err,users) {
            if(err){
                console.log(err);
            }
            res.render('admin/user_list', {
                title:'用户列表页',
                users:users
            });
        });
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
    if(_user = "" || _user.role <= 10){
        // return res.redirect("/");
        return res.send("你根本不是老司机");
    }
    next();
};
