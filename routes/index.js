var express = require('express');
var router = express.Router();
var User = require('../controllers/user/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '屌炸天的天展点餐系统' });
});

router.get("/singnin",User.signin);

module.exports = router;
