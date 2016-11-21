var mongoose = require('mongoose'),
    Order = mongoose.model("Order"),
    Menu  = mongoose.model("Menu"),
    User  = mongoose.model("User");

exports.index = function (req,res) {               //菜单主页



    res.render('admin/order', {
        title:'订单详细页'
    });

};

exports.order = function (req,res) {


    User.findOne({account:"admin"})
        .populate('_id')
        .exec(function (err, _id) {
            console.log(err,_id);


            var _menu = {
                menu_num:12,

                orders: [{account:_id, DishName:"急急急"}]
            };
            console.log(_menu);

            var order;

            // 数据库中没有该用户名，将其数据生成新的用户数据并保存至数据库
            order = new Order(_menu);
            order.save(function(err) {
                if(err){
                    console.log(err);
                }

                // req.session.user = user;         // 将当前登录用户名保存到session中
                return res.json({status:2,data:2,id:order._id});       // 注册成功
            });
        });





};