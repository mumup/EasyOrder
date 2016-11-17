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
            return res.json({status:0,msg:"发生错误,请重试"});       // 发生错误
        }

        var _menu = {
                menu:menuList,
                menu_num:(MenuNum != "")? MenuNum[0].menu_num + 1:1
            },

            menu = new Menu(_menu);

        menu.save(function(err) {
            if(err){
                console.log(err);
            }
            return res.json({status:1,msg:"发送成功"});       // 发送成功
        });

    });
};
