// 配置文档2016年12月14日

module.exports = {
  title: '点餐系统', // 首页title
  port: '3000', // 开启端口
  Db: 'mongodb://127.0.0.1/tz', // 数据库地址
  secret: 'tz' // 设置的secret字符串，来计算hash值并放在cookie中
}
