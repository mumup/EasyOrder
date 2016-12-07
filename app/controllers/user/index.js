var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    Menu = mongoose.model("Menu");
var moment = require('moment');


exports.index = function (req,res) {

    Menu.findByMenuNum({"meta.createAt": {"$gt" : moment().format("YYYY-MM-DD")}},0,function (err,MenuNum) {


        var _menu     = [];

        if(MenuNum != ""){
            var _menuList = MenuNum[0].menu;
            for(var i = 0;i < _menuList.length; i++){
                _menu.push({num:i+1,dishName:_menuList[i]})
            }
        }

        res.render('index',{
            title:'点餐系统',
            menuList:_menu,
            menuNum:(MenuNum == "")?["0"]:MenuNum[0].menu_num
        })
    });
};
