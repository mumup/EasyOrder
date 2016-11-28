var mongoose = require('mongoose'),
    Order = mongoose.model("Order"),
    Menu = mongoose.model("Menu"),
    User = mongoose.model("User");
var moment = require('moment');

exports.index = function (req, res) {               //菜单主页


    Order.findOrder({"meta.createAt": {"$gt" : moment().format("YYYY-MM-DD")}},1,function (err,order) {

        res.render('admin/order', {
            title: '订单详细页',
             orders:(order != "")? order[0].orders:""
        });
    });



};

//首页发送订单接口
exports.order = function (req, res) {
    var _account = req.session.user.account || "";
    var _name    = req.session.user.name || "";
    var _menu_num = req.body.menu_num || "";
    var food = req.body.food || "";

    Menu.findByMenuNum({}, 1, function (err, MenuNum) {                  //拿到最新菜单编号
        if (_menu_num != MenuNum[0].menu_num) {
            return res.json({status: 2, msg: "订餐失败,请刷新页面获取最新的菜单"})      //如果不匹配
        }
        var _menu = {
            menu_num: _menu_num,
            orders: {account: _account, DishName: food,name:_name}
        };
        Order.findOne({menu_num: _menu_num}, function (err, _Order) {
            if (_Order) {

                for (var i = 0; i < _Order.orders.length; i++) {                   //遍历订单数组
                    if (_Order.orders[i].account == _account) {
                        return res.json({status: 3, msg: "你订过餐啦"});
                    }
                }

                Order.update({menu_num: _menu_num}, {$push: {"orders": _menu.orders}}, function (err) {
                    if (err) {
                        console.log(err)
                    }
                });
                res.json({status: 4, msg: "订餐成功"});

            } else {
                var order;
                order = new Order(_menu);
                order.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    return res.json({status: 0, msg: "订餐成功"});
                });
            }
        });
    })


};