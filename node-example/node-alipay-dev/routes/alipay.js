var express = require('express');
var router = express.Router();
var alipayController = require('../controllers/alipayController');

router.post('/pcpay', alipayController.pcPay); // 支付
router.get('/query', alipayController.query); // 查看支付状态

module.exports = router;
