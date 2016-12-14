var mongoose = require('mongoose'),
    moment = require('moment'),
    Order = mongoose.model("Order"),
    Menu = mongoose.model("Menu"),
    User = mongoose.model("User");


exports.index = function (req, res) {
    var menuNum,OrderNum;
    Order.findOrder({"meta.createAt": {"$gt": moment().format("YYYY-MM-DD")}}, 1, function (err, order) {
        if(order.length == 0){
            menuNum = "今日暂无";
            OrderNum = 0;
        }else {
            console.log(order)
            menuNum = order[0].menu_num;
            OrderNum = order[0].orders.length;
        }
        User.countUser(function (err, count) {
            res.render('admin/admin', {
                title: '后台管理',
                menuNum:menuNum,
                userCount:count,
                OrderNum:OrderNum
            });
        });
    });
};

exports.getSysInfo = function (req, res) {
    Menu.findByMenuNum({"meta.createAt": {"$gt": moment().format("YYYY-MM-DD")}}, 1, function (err, order) {
        User.countUser(function (err, count) {
            res.json(order);
        })
    });
};


