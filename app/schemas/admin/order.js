var mongoose = require('mongoose')
//  var moment = require('moment')
//  var Schema = mongoose.Schema

// ObjectId是mongoose中重要的引用字段类型，在Schema中默认配置了该属性，索引也是利用组件进行

//  var ObjectId = Schema.Types.ObjectId

var OrderSchema = new mongoose.Schema({

  // 订单字段

  menu_num: {
    type: Number
  },

  orders: [
    {
      account: String,
      name: String,
      DishName: String,
      num: Number,
      time: { type: Date, default: Date.now }
    }
  ],

  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 定义查询静态方法
OrderSchema.statics = {
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
  findOrder: function (date, LimitNum, cb) {
    return this
      .find(date)
      .sort({ 'menu_num': -1 })
      .limit(LimitNum)
      .exec(cb)
  },
  findLastOrder: function (menuNum, account, cb) {
    return this
      .find({ 'menu_num': menuNum }, { 'orders': { '$elemMatch': { 'account': account } } })
      .exec(cb)
  },
  // menu_num  菜单序号
  // account  用户名
  //   Dish_name 菜名
  //   num       当前菜名序号

  updateOrder: function (menuNum, num, account, dishName, cb) {
    return this
      .update({ 'menu_num': menuNum, 'orders.account': account }, {
        $set: {
          'orders.$.DishName': dishName,
          'orders.$.num': num
        }
      })
      .exec(cb)
  }

}

module.exports = OrderSchema
