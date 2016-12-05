var mongoose = require('mongoose'),
    Order = mongoose.model("Order"),
    Menu = mongoose.model("Menu"),
    User = mongoose.model("User");

var officegen = require('officegen');
var fs = require('fs');
var path = require('path');
var docx = officegen('docx');
var async = require('async');

var moment = require('moment');

exports.index = function (req, res) {               //菜单主页

    // Order.findOrder({"meta.createAt": {"$gt" : moment().format("YYYY-MM-DD")}},1,function (err,order) {
    //
    //     console.log(order);
    //     res.render('admin/order', {
    //         title: '订单详细页',
    //          orders:(order != "")? order[0].orders:""
    //     });
    // });


    res.render('admin/order', {
        title: '订单详细页'
    });
};


//生成word文档接口
exports.outputWord = function (req, res) {

    console.log('--------------exportWord-------------');

    docx.on('error', function (err) {
        console.log(err);
    });

    var pObj = docx.createP({align: 'center'});

    pObj.addText('测试测试测试这是测试啊', {bold: true, font_face: 'Arial', font_size: 18});


    var out = fs.createWriteStream('tmp/'+ Date.now() +'.docx');

    out.on('error', function (err) {
        console.log(err);
    });


    async.parallel([
        function (done) {
            out.on('close', function () {
                console.log('Finish to create a DOCX file.');
                pObj = "";
                done(null);
            });
            docx.generate(out);
        }

    ], function (err) {
        if (err) {
            console.log('error: ' + err);
        } // Endif.

    });


    // 设置 header 使浏览器下载文件
    res.setHeader('Content-Description', 'File Transfer');
    res.setHeader('Content-Type', 'application/docx; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=data.docx');
    res.setHeader('Expires', '0');
    res.setHeader('Cache-Control', 'must-revalidate');

    // 为了让 Windows 能识别 utf-8，加上了 dom
    docx.generate (res)

};

//获取用户订单接口

exports.getOrderList = function (req, res) {
    Order.findOrder({"meta.createAt": {"$gt": moment().format("YYYY-MM-DD")}}, 1, function (err, order) {
        if (err) {
            console.log(err)
        }

        var _res = order[0].orders;

        _res.sort(function (a, b) {
            return a.num - b.num;
        });

        res.json(_res)
    });
};


//首页发送订单接口
exports.order = function (req, res) {
    var _account = req.session.user.account || "";
    var _name = req.session.user.name || "";
    var _menu_num = req.body.menu_num || "";
    var food = req.body.food || "";
    var num = req.body.num || "";

    Menu.findByMenuNum({}, 1, function (err, MenuNum) {                  //拿到最新菜单编号
        if (_menu_num != MenuNum[0].menu_num) {
            return res.json({status: 2, msg: "订餐失败,请刷新页面获取最新的菜单"})      //如果不匹配
        }
        var _menu = {
            menu_num: _menu_num,
            orders: {account: _account, DishName: food, name: _name, num: num}
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