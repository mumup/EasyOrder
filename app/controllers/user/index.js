var mongoose = require("mongoose"),
    User = mongoose.model("User"),
    Menu = mongoose.model("Menu"),
    Order = mongoose.model("Order");
var moment = require('moment');


exports.index = function (req,res) {

    var _user = req.session.user.account || "";

    Menu.findByMenuNum({"meta.createAt": {"$gt" : moment().format("YYYY-MM-DD")}},0,function (err,MenuNum) {

        Order.findLastOrder(MenuNum[0].menu_num,_user,function (err,LastOrder) {


            console.log(LastOrder)
            console.log(MenuNum[0].menu_num)
            console.log(LastOrder[0].DishName)

            if(LastOrder[0].DishName != ""){
                var order = {
                    "_order":LastOrder[0].DishName,
                    "_id": LastOrder[0]._id
                };
            }
            console.log(order);

            var _menu     = [];

            if(MenuNum != ""){
                var _menuList = MenuNum[0].menu;
                for(var i = 0;i < _menuList.length; i++){
                    _menu.push({num:i+1,dishName:_menuList[i]})
                }
            }

            res.render('index',{
                title:'点餐系统',
                menuList:_menu,
                menuNum:(MenuNum == "")?["0"]:MenuNum[0].menu_num,
                orders:order
            })
        });

    });
};
