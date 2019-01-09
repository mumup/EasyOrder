var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

var UserSchema = new mongoose.Schema({
  account: {
    unique: true,
    type: String
  },
  name: String,

  password: String,
  /*
    0:普通用户
    >10::admin
    >50::毁天灭地admin
     */
  role: {
    type: Number,
    default: 0
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})

UserSchema.pre('save', function (next) {
  var user = this
  this.meta.createAt = this.meta.updateAt = Date.now()

  // 生成随机盐,混合密码后加密
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

UserSchema.methods = {
  comparePassword: function (password, cb) {
    // 使用bcrypt的compare方法进行密码比对
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
        return cb(err)
      }
      cb(null, isMatch)
    })
  }
}

// 给模型添加静态方法
UserSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this
      .findOne({ _id: id })
      .exec(cb)
  },
  countUser: function (cb) {
    return this
      .find({})
      .count()
      .exec(cb)
  }
}

module.exports = UserSchema
