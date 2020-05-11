var express = require('express');
var router = express.Router();
var orderController = require('../controllers/orderController');

router.post('/create', orderController.createOrder);

module.exports = router;
