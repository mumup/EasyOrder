var mongoose = require('mongoose'),
    moment = require('moment'),
    Order = mongoose.model("Order"),
    Menu = mongoose.model("Menu"),
    User = mongoose.model("User"),
    officegen = require('officegen'),
    fs = require('fs'),
    path = require('path'),
    async = require('async');

exports.index = function (req, res) {               //菜单主页

    Order.findOrder({"meta.createAt": {"$gt": moment().format("YYYY-MM-DD")}}, 1, function (err, order) {


        Menu.findByMenuNum({}, 1, function (err, MenuNum) {                  //拿到最新菜单编号
            if (order[0].menu_num != MenuNum[0].menu_num) {
                res.render('admin/order', {
                    title: '订单详细页',
                    orders: ""
                });
            } else {
                var _res = order[0].orders;

                _res.sort(function (a, b) {
                    return a.num - b.num;
                });
                res.render('admin/order', {
                    title: '订单详细页',
                    orders: (order != "") ? _res : ""
                });
            }
        });
    });
};

//生成Excel文档接口
exports.outputExcel = function (req, res) {


    Order.findOrder({"meta.createAt": {"$gt": moment().format("YYYY-MM-DD")}}, 1, function (err, order) {
        var xlsx = officegen('xlsx');

        xlsx.on('finalize', function (written) {
            console.log('Finish to create an Excel file.\nTotal bytes created: ' + written + '\n');
        });

        xlsx.on('error', function (err) {
            console.log(err);
        });

        sheet = xlsx.makeNewSheet();
        sheet.name = moment(Date.now()).format("MM.DD");

// The direct option - two-dimensional array:
        sheet.data[0] = [];
        sheet.data[0][0] = '编号';
        sheet.data[0][1] = '姓名';
        sheet.data[0][2] = '菜名';

        var _res = order[0].orders;

        _res.sort(function (a, b) {
            return a.num - b.num;
        });


        for (var i = 0, row = 1; i < _res.length; i++, row++) {
            sheet.data[row] = [];
            sheet.data[row][0] = _res[i].num;
            sheet.data[row][1] = _res[i].name;
            sheet.data[row][2] = _res[i].DishName;
        }

        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');   //这个不知道是什么鬼
        res.set('Content-disposition', 'attachment; filename=' + moment(Date.now()).format("MM-DD-HHmm") + '.xlsx');                                    //导出的文件名

        xlsx.generate(res);      // 客户端导出word


    });


};

//生成word文档接口
exports.outputWord = function (req, res) {


    Order.findOrder({"meta.createAt": {"$gt": moment().format("YYYY-MM-DD")}}, 1, function (err, order) {
        var docx = officegen('docx');

        console.log('---------------exportWord-------------');

        docx.on('error', function (err) {
            console.log(err);
        });

        docx.on('finalize', function (written) {
            console.log('Finish to create a PowerPoint file.\nTotal bytes created: ' + written + '\n');
        });


        var pObj = docx.createP({align: 'center'});// 创建行 设置居中
        pObj.addText('订餐列表', {bold: true, font_face: 'Arial', font_size: 18});// 添加文字 设置字体样式 加粗 大小
        pObj.addText("2016-12-6");

        //内容行

        var _res = order[0].orders;

        _res.sort(function (a, b) {
            return a.num - b.num;
        });


        var pObj = docx.createP();
        for (var i = 0; i < _res.length; i++) {
            pObj.addText((i + 1) + "  " + _res[i].name + "      " + _res[i].DishName);
            pObj.addLineBreak();
        }


        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');   //这个不知道是什么鬼
        res.set('Content-disposition', 'attachment; filename=surprise.docx');                                    //导出的文件名

        docx.generate(res);      // 客户端导出word


    });


};

//获取用户订单接口

exports.getOrderList = function (req, res) {
    Order.findOrder({"meta.createAt": {"$gt": moment().format("YYYY-MM-DD")}}, 1, function (err, order) {
        if (err) {
            console.log(err)
        }
        Menu.findByMenuNum({}, 1, function (err, MenuNum) {                  //拿到最新菜单编号
            if (order[0].menu_num != MenuNum[0].menu_num) {
                return res.json({status: 0, msg: "暂无订单"});      //如果不匹配
            } else {
                var _res = order[0].orders;

                _res.sort(function (a, b) {
                    return a.num - b.num;
                });
                res.json(_res)
            }
        });
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
            return res.json({status: 2, msg: "订餐失败,请刷新页面获取最新的菜单"});      //如果不匹配
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