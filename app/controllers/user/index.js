var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    Menu = mongoose.model("Menu");
var moment = require('moment');


exports.index = function (req,res) {

    Menu.findByMenuNum({"meta.createAt": {"$gt" : moment().format("YYYY-MM-DD")}},function (err,MenuNum) {




        res.render('index',{
            title:'非常有趣',
            menuList:(MenuNum == "")?["暂无菜单"]:MenuNum[0].menu
        })
    });

};
