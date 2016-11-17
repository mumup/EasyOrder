var mongoose = require('mongoose'),
Menu = mongoose.model("Menu");

exports.index = function (req,res) {
    res.render('admin/menu', {
        title:'菜单发布页'
    });
};


//接收菜单列表储存
exports.sendMenu = function (req,res) {
    var menuList = req.body.menu || "";
    menuList = menuList.split(",");



    Menu.findByMenuNum({},function (err,MenuNum) {
        if (err){
            console.log(err);
        }

        // console.log(typeof MenuNum);
        //
        // if (MenuNum == "[]"){
        //     MenuNum[0].menu_num = 1;
        // }

        // console.log(MenuNum);

        var _menu = {
                menu:menuList,
                menu_num:MenuNum[0].menu_num + 1
            },

            menu = new Menu(_menu);

        menu.save(function(err) {
            if(err){
                console.log(err);
            }
            // req.session.user = user;         // 将当前登录用户名保存到session中
            return res.json({status:1,msg:"\u53d1\u9001\u6210\u529f",id:menu._id});       // 发送成功
        });

    });
};
