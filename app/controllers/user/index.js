var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    Menu = mongoose.model("Menu"),
    Order = mongoose.model("Order");
var moment = require('moment');


exports.index = function (req, res) {

    if (req.session.user) {            //判断是否登录
        var _user = req.session.user.account;

        Menu.findByMenuNum({"meta.createAt": {"$gt":new Date(moment(Date.now()).format("YYYY-MM-DD"))}}, 1, function (err, MenuNum) {

            if (err){console.log(err)}

            var _menu = [];

            if (MenuNum != "") {
                var _menuList = MenuNum[0].menu;
                for (var i = 0; i < _menuList.length; i++) {
                    _menu.push({num: i + 1, dishName: _menuList[i]})
                }

                Order.findLastOrder(MenuNum[0].menu_num, _user, function (err, LastOrder) {


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

                    res.render('index', {
                        title: '点餐系统',
                        menuList: _menu,
                        menuNum: (MenuNum == "") ? ["0"] : MenuNum[0].menu_num,
                        orders: order
                    })
                });

            }else {
                res.render('index', {
                    title: '点餐系统',
                    menuList:""
                })
            }
        });


    } else {                     //没有登录直接渲染主页
        res.render('index', {
            title: '点餐系统'
        })
    }


};
