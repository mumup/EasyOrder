var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema,
    // ObjectId是mongoose中重要的引用字段类型，在Schema中默认配置了该属性，索引也是利用组件进行
    ObjectId = Schema.Types.ObjectId;


var OrderSchema = new mongoose.Schema({

    //订单字段

        menu_num:{
            type: Number
        },

        orders:[
            {
                account:{
                    type:ObjectId,
                    ref:"User"
                },
                DishName:String
            }
        ],


    meta:{
        createAt:{
            type: Date,
            default:Date.now()
        }
    }
});


// 定义查询静态方法
OrderSchema.statics = {
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
    }
};

module.exports = OrderSchema;
