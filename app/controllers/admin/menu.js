var mongoose = require('mongoose'),
Menu = mongoose.model("Menu");
// var moment = require('moment');

exports.index = function (req,res) {               //菜单主页

    Menu.findByMenuNum({},3,function (err,MenuNum){
        if (err){
            console.log(err);// 发生错误
        }




        res.render('admin/menu', {
            title:'菜单发布页',
            menu:(MenuNum != "")? MenuNum:"还没有发布过菜单"
        });
    });

};

//删除菜单
exports.del = function(req,res) {
    // 获取客户端Ajax发送的URL值中的id值
    var num  = req.query.num;
    if(num) {
        // 如果id存在则服务器中将该条数据删除并返回删除成功的json数据
        Menu.remove({menu_num:num},function(err) {
            if(err){
                console.log(err);
            }
            res.json({status:1,msg:"删除成功"});              // 删除成功
        });
    }else {
        res.json({status:0,msg:"发生错误"});              // 发生错误
    }
};



//接收菜单列表储存
exports.sendMenu = function (req,res) {
    var menuList = req.body.menu || "";
    menuList = menuList.split(",");

    Menu.findByMenuNum({},1,function (err,MenuNum) {
        if (err){
            console.log(err);
            return res.json({status:0,msg:"发生错误,请重试"});       // 发生错误
        }
        console.log(MenuNum);

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
