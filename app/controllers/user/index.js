var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    Menu = mongoose.model("Menu");
var moment = require('moment');


exports.index = function (req,res) {

    Menu.findByMenuNum({"meta.createAt": {"$gt" : moment().format("YYYY-MM-DD")}},0,function (err,MenuNum) {


        console.log(moment().format("YYYY-MM-DD"));



        res.render('index',{
            title:'点餐系统',
            menuList:(MenuNum == "")?["暂无菜单"]:MenuNum[0].menu,
            menuNum:(MenuNum == "")?["0"]:MenuNum[0].menu_num
        })
    });
};
