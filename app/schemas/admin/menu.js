var mongoose = require('mongoose');
var moment = require('moment');
var MenuSchema = new mongoose.Schema({

    menu:{
        type:Array
    },

    menu_num:{
        type:Number,
        default:1,
        unique:true
    },

    meta:{
        createAt:{
            type: Date,
            default:Date.now()
        }
    }
});


// 定义查询静态方法
MenuSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function(id,cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    },

    findByMenuNum:function (arg,LimitNum,cb) {
        return this
            .find(arg)
            .sort({'menu_num':-1})
            .limit(LimitNum)
            .exec(cb);
    }
};


module.exports = MenuSchema;