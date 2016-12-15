var mongoose = require("mongoose"),
    config = require("../../../config"),
    User = mongoose.model("User"),
    Menu = mongoose.model("Menu"),
    Order = mongoose.model("Order");
var moment = require('moment');


exports.index = function (req, res) {

    if (req.session.user) {            //判断是否登录
        var _user = req.session.user.account;

        Menu.findByMenuNum({"meta.createAt": {"$gt":new Date(moment(Date.now()).format("YYYY-MM-DD"))}}, 1, function (err, MenuNum) {

            console.log(MenuNum);
            if (err){console.log(err)}

            var _menu = [];

            if (MenuNum != "" && MenuNum[0].status == 0) {                                   //循环撸菜单编码{num:1,dishName:什么鬼}
                var _menuList = MenuNum[0].menu;
                for (var i = 0; i < _menuList.length; i++) {
                    _menu.push({num: i + 1, dishName: _menuList[i]})
                }

                Order.findLastOrder(MenuNum[0].menu_num, _user, function (err, LastOrder) {       //找到用户今天最新的一个单


                    console.log(LastOrder)
                    console.log(MenuNum[0].menu_num)
                    // console.log(LastOrder[0].DishName)

                    var order;
                    if (LastOrder == "" || LastOrder[0].orders == ""){
                        order = "";
                    }else {
                        order = {
                            "_order":LastOrder[0].orders[0].DishName,
                            "_id": LastOrder[0]._id
                        }
                        console.log(order)
                    }

                    res.render('index', {             //有菜单,用户有最新订单
                        title: config.title,
                        menuList: _menu,
                        menuNum: (MenuNum == "") ? ["0"] : MenuNum[0].menu_num,
                        orders: order
                    })
                });

            }else {
                res.render('index', {    //登陆没最新菜单直接渲染空菜单表
                    title: config.title,
                    menuList:""
                })
            }
        });


    } else {                     //没有登录直接渲染主页
        res.render('index', {
            title: config.title
        })
    }


};
