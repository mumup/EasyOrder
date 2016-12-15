var mongoose = require('mongoose');
var moment = require('moment');
var MenuSchema = new mongoose.Schema({

    menu: {
        type: Array
    },

    menu_num: {
        type: Number,
        default: 1,
        unique: true
    },

    meta: {
        createAt: {
            type: Date,
            default: Date.now
        }
    },
    status: {
        type: Number,
        default: 0
    }
});


// 定义查询静态方法
MenuSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findByMenuNun: function (num, cb) {
        return this
            .findOne({menu_num:num})
            .exec(cb);
    },

    updateOrder: function (num,cb) {
        return this
            .update({"menu_num": num}, {
                $set: {
                    "status": 1
                }
            })
            .exec(cb);
    },

    findByMenuNum: function (arg, LimitNum, cb) {
        return this
            .find(arg)
            .sort({'menu_num': -1})
            .limit(LimitNum)
            .exec(cb);
    }
};


module.exports = MenuSchema;