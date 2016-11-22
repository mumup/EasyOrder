var mongoose = require('mongoose'),
    Order = mongoose.model("Order"),
    Menu = mongoose.model("Menu"),
    User = mongoose.model("User");

exports.index = function (req, res) {               //菜单主页


    res.render('admin/order', {
        title: '订单详细页'
    });

};

exports.order = function (req, res) {
    var _account = req.session.user.account || "";
    var _menu_num= req.body.menu_num || "";
    var food = req.body.food || "";

    console.log(_account);
    console.log(food);


    User.findOne({account: _account}, function (err, _account) {

            var _menu = {
                menu_num: _menu_num,
                orders: [{account: _account, DishName: food}]
            };
            Order.findOne({menu_num:_menu_num},function (err,_Order) {
                if (_Order){
                    return res.json({status: 1, msg: "订餐失败"});
                }else {
                    var order;
                    order = new Order(_menu);
                    order.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                        return res.json({status: 0, msg: "订餐成功"});       // 注册成功
                    });
                }
            });

            console.log(_menu);


    })

};