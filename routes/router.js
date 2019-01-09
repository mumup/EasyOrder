var EasyOrder = require('../app/controllers/user/user')

var Index = require('../app/controllers/user/index')

var Admin = require('../app/controllers/admin/admin')

var Menu = require('../app/controllers/admin/menu')

var Order = require('../app/controllers/admin/order')

module.exports = function (app) {
  // 登陆处理
  app.use(function (req, res, next) {
    app.locals.user = req.session.user // 将session中保存的用户名存储到本地变量中
    next()
  })

  // 公共路由
  app.get('/', Index.index) // 首页首页
  app.post('/user/login', EasyOrder.login) // 登录接口
  app.get('/logout', EasyOrder.logout) // 登出接口
  app.post('/user/register', EasyOrder.signup) // 注册接口
  app.get('/admin', EasyOrder.singinRequired, EasyOrder.adminRequired, Admin.index) // 管理员页面
  app.route('/admin/user_list').get(EasyOrder.singinRequired, EasyOrder.adminRequired, EasyOrder.user_list)// 用户列表页面
    .delete(EasyOrder.del) // 删除用户接口

  app.route('/admin/menu').get(EasyOrder.singinRequired, EasyOrder.adminRequired, Menu.index) // 用户菜单接口
    .delete(Menu.del) // 删除菜单接口
  app.get('/admin/stop_order', EasyOrder.adminRequired, Menu.stopOrder) // 停止订餐

  app.post('/admin/getMenuList', EasyOrder.singinRequired, EasyOrder.adminRequired, Menu.sendMenu) // 发送菜单接口

  app.route('/admin/order').get(EasyOrder.singinRequired, EasyOrder.adminRequired, Order.index) // 用户订单页面
  app.get('/admin/getOrderList', EasyOrder.singinRequired, EasyOrder.adminRequired, Order.getOrderList) // 获取用户订单接口

  app.get('/admin/outputWord', EasyOrder.singinRequired, EasyOrder.adminRequired, Order.outputWord) // 导出word表单
  app.get('/admin/outputExcel', EasyOrder.singinRequired, EasyOrder.adminRequired, Order.outputExcel) // 导出Excel表单

  app.get('/admin/getSysInfo', Admin.getSysInfo) // admin首页信息接口
  app.post('/user/orders', EasyOrder.singinRequired, Order.order) // 首页下单接口
  app.post('/user/EditOrders', Order.EditOrder) // 修改订单接口

  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    console.log(err)
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: {}
    })
    next(err)
  })

  // // catch 404 and forward to error handler
  // app.use(function(req, res, next) {
  //     var err = new Error('Not Found');
  //     err.status = 404;
  //     res.status(err.status || 404);
  //     res.render('404');
  //     next(err);
  // });

  // 404
  app.use(function (req, res) {
    // var err = new Error('Not Found');
    // err.status = 404;
    res.status(404)
    res.render('404')
  })
}
