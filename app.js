var express = require('express') // 主文件
var path = require('path') // 路径
//  var favicon = require('serve-favicon')
var logger = require('morgan')
var fs = require('fs')
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session') // session依赖cookie模块
var MongoStore = require('connect-mongo')(session) // 对session进行持久化
var config = require('./config')

mongoose.connect(config.Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  useCreateIndex: true
})// 初始化连接

var app = express()

app.locals.moment = require('moment')// 引入moment模块并设置为app.locals属性,用来格式化时间

//  模板引擎
app.set('views', path.join(__dirname, 'views/pages'))
app.set('view engine', 'pug')

//  uncomment after placing your favicon in /public
//  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// models loading
var modelsPath = path.join(__dirname, '/app/models') // 模型所在路径
// 路径加载函数，加载各模型的路径,所以可以直接通过mongoose.model加载各模型 这样即使模型路径改变也无需更改路径
var walk = function (path) {
  fs
    .readdirSync(path)
    .forEach(function (file) {
      var newPath = path + '/' + file
      var stat = fs.statSync(newPath)
      // 如果是文件
      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(newPath)
        }
        // 如果是文件夹则继续遍历
      } else if (stat.isDirectory()) {
        walk(newPath)
      }
    })
}
walk(modelsPath)

app.use(session({
  secret: config.secret, // 设置的secret字符串，来计算hash值并放在cookie中
  resave: false, // session变化才进行存储
  saveUninitialized: true,
  // 使用mongo对session进行持久化，将session存储进数据库中
  store: new MongoStore({
    url: config.Db, // 本地数据库地址
    collection: 'sessions' // 存储到mongodb中的字段名
  })
}))

module.exports = app
