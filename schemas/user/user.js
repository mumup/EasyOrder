'use strict';

var mongoose = require('mongoose'),
    bcrypt     = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:String,
    /*
    0:普通用户
    >10::admin
    >50::毁天灭地admin
     */
    role:{
        type:Number,
        default:0
    },
    meta:{
        createAt:{
            type: Date,
            default:Date.now()
        },

        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

UserSchema.pre("save",function (next) {
    var user = this;
    this.meta.createAt = this.meta.updateAt = Date.now();

    //生成随机盐,混合密码后加密
    bcrypt.genSalt(SALT_WORK_FACTOR,function (err,salt) {
        if (err){
            return next(err);
        }
        bcrypt.hash(user.password,salt,function (err,hash) {
            if(err){
                return next(err)
            }
            user.password = hash;
            next();
        })
    })
});

// 给模型添加静态方法
UserSchema.static = {
    fetch:function (cb) {
        return this
            .find({})
            .sort("meta.updateAt")
            .exec(cb);
    },
    findById:function (id,cb) {
        return this
            .findOne({_id:id})
            .exec(cb);
    }
};

module.exports = UserSchema;