var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    Menu = mongoose.model("Menu");


exports.index = function (req,res) {

    Menu.findByMenuNum({},function (err,MenuNum) {

        res.render('index', {
            title:'首页',
            menuList:MenuNum[0].menu
        })
    });



};
