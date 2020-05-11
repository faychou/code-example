const { createOrderNo } = require('../utils/util');

module.exports = {
  createOrder(req, res) {
    const  { userId, totalPrice } = req.body;
    
    res.json({
      outTradeNo: createOrderNo()
    });
  }
}