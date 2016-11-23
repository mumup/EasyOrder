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
    console.log(_menu_num);


    User.findOne({account: _account}, function (err, _account) {       //拿到用户信息

        console.log(_account)

        Menu.findByMenuNum({},1,function (err,MenuNum) {                  //发送菜单获取最新菜单编号
            if(_menu_num != MenuNum[0].menu_num){
                return res.json({status: 2, msg: "发送失败,请刷新页面获取最新的菜单"})
            }
            var _menu = {
                menu_num: _menu_num,
                orders: {account: _account, DishName: food}
            };
            Order.findOne({menu_num: _menu_num}, function (err, _Order) {
                if (_Order) {
                    console.log(_Order.orders.length);
                    console.log(_Order.orders[i].account)
                    for(var i = 0; i < _Order.orders.length; i++){
                        if(_Order.orders[i].account == _account._id){
                            console.log("11111")
                        }else{
                            console.log("22222")
                        }
                    }
                    Order.update({menu_num: _menu_num},{$push:{"orders":_menu.orders}},function(err){
                        if (err){console.log(err)}
                    })
                } else {
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
        })

    })

};