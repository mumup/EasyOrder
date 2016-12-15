var mongoose = require('mongoose'),
    moment = require('moment'),
    Order = mongoose.model("Order"),
    Menu = mongoose.model("Menu"),
    User = mongoose.model("User");


exports.index = function (req, res) {
    var menuNum, OrderNum, status;
    Order.findOrder({"meta.createAt": {"$gt": moment().format("YYYY-MM-DD")}}, 1, function (err, order) {
        User.countUser(function (err, count) {
            if (err) {
                console.log(err)
            }
            if (order.length == 0) {
                res.render('admin/admin', {
                    title: '后台管理',
                    menuNum: "今日暂无",
                    userCount: count,
                    OrderNum: "暂无"
                });
            } else {
                Menu.findByMenuNun(order[0].menu_num, function (err, status) {
                    if (err) {
                        console.log(err)
                    }
                    console.log(status, order[0].menu_num);
                    menuNum = order[0].menu_num;
                    OrderNum = order[0].orders.length;
                    status = status.status;

                    console.log(status)
                    res.render('admin/admin', {
                        title: '后台管理',
                        menuNum: menuNum,
                        userCount: count,
                        OrderNum: OrderNum,
                        status: status
                    });
                })
            }
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


