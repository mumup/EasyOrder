var mongoose = require('mongoose'),
    moment = require('moment'),
   Order = mongoose.model("Order"),
    Menu = mongoose.model("Menu"),
    User = mongoose.model("User");


exports.index = function (req,res) {
    Order.findOrder({"meta.createAt": {"$gt": moment().format("YYYY-MM-DD")}}, 1, function (err, order) {
        res.json(order);
    });
        res.render('admin/admin', {
            title:'后台管理'
        });
};

exports.getSysInfo = function (req,res) {
    Menu.findByMenuNum({"meta.createAt": {"$gt": moment().format("YYYY-MM-DD")}},1, function (err, order) {
        User.countUser(function (err,count) {
            res.json(order);
        })
    });
};


