var mongoose = require('mongoose'),
    moment = require('moment'),
    Order = mongoose.model("Order"),
    Menu = mongoose.model("Menu"),
    User = mongoose.model("User");


exports.index = function (req, res) {
    var menuNum,OrderNum,status;
    Order.findOrder({"meta.createAt": {"$gt": moment().format("YYYY-MM-DD")}}, 1, function (err,order) {
        if(order.length == 0){
            menuNum = "今日暂无";
            OrderNum = 0;
            status  = "今日未发布"
        }else {
            Menu.findByMenuNun(order[0].menu_num,function (err,status) {
                console.log(status,order[0].menu_num);
                menuNum = order[0].menu_num;
                OrderNum = order[0].orders.length;
                status = status.status;

                User.countUser(function (err, count) {
                    console.log(status)
                    res.render('admin/admin', {
                        title: '后台管理',
                        menuNum:menuNum,
                        userCount:count,
                        OrderNum:OrderNum,
                        status:status
                    });
                });
            });

        }

    });
};

exports.getSysInfo = function (req, res) {
    Menu.findByMenuNum({"meta.createAt": {"$gt": moment().format("YYYY-MM-DD")}}, 1, function (err, order) {
        User.countUser(function (err, count) {
            res.json(order);
        })
    });
};


