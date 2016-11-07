var mongoose = require('mongoose');


exports.index = function (req,res) {
        res.render('admin/admin', {
            title:'后台管理'
        });
};




