var mongoose = require('mongoose');

exports.index = function (req,res) {
    res.render('admin/menu', {
        title:'菜单发布页'
    });
};
