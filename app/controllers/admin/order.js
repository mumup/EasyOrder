var mongoose = require('mongoose'),
    Order = mongoose.model("Order"),
    Menu  = mongoose.model("Menu"),
    User  = mongoose.model("User");

exports.index = function (req,res) {               //菜单主页



    res.render('admin/order', {
        title:'订单详细页'
    });

};

exports.order = function (req,res) {



};