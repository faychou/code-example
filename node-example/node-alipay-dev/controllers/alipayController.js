const axios = require('axios');
const alipaySdk = require('../utils/alipay');
const AlipayFormData = require('alipay-sdk/lib/form').default; // alipay.trade.page.pay 返回的内容为 Form 表单

module.exports = {
  async pcPay(req, res) {
    try {
      // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
      const formData = new AlipayFormData();
      formData.setMethod('get');
        
      // 通过 addField 增加参数
      // 在用户支付完成之后，支付宝服务器会根据传入的 notify_url，以 POST 请求的形式将支付结果作为参数通知到商户系统。
      formData.addField('notifyUrl', 'http://www.com/notify'); // 支付成功回调地址
      formData.addField('bizContent', {
        outTradeNo: req.body.outTradeNo, // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
        productCode: 'FAST_INSTANT_TRADE_PAY', // 销售产品码，与支付宝签约的产品码名称,仅支持FAST_INSTANT_TRADE_PAY
        totalAmount: '0.01', // 订单总金额，单位为元，精确到小数点后两位
        subject: '商品', // 订单标题
        body: '商品详情', // 订单描述
      });
      // 如果需要支付后跳转到商户界面，可以增加属性"returnUrl"
      
      const result = await alipaySdk.exec(
        'alipay.trade.page.pay', // 统一收单下单并支付页面接口
        {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
        { formData: formData },
      );
      
      // result 为可以跳转到支付链接的 url
      res.json({
        url: result
      });
    } catch(e) {
      res.json({
        e
      });
    }
  },
  async query(req, res) {
    try {
      const { outTradeNo } = req.query;
      const formData = new AlipayFormData();
      formData.setMethod('get');
      formData.addField('bizContent', {
        outTradeNo
      });
      
      // 通过该接口主动查询订单状态
      const result = await alipaySdk.exec(
        'alipay.trade.query', 
        {}, 
        { formData: formData },
      );
      
      axios({
        method: 'GET',
        url: result
      })
      .then(data => {
        console.log('查询支付结果:', data.data);
        let r = data.data.alipay_trade_query_response;
        if(r.code === '10000') { // 接口调用成功
          switch(r.trade_status) {
            case 'WAIT_BUYER_PAY':
              res.send('交易创建，等待买家付款');
              break;
            case 'TRADE_CLOSED':
              res.send('未付款交易超时关闭，或支付完成后全额退款');
              break;
            case 'TRADE_SUCCESS':
              res.send('交易支付成功');
              break;
            case 'TRADE_FINISHED':
              res.send('交易结束，不可退款');
              break;
          }
        } else if(r.code === '40004') {
          res.send('交易不存在');
        }
      })
      .catch(err => {
        res.json({
          msg: '查询失败',
          err
        });
      });
    } catch(e) {
      res.json({
        e
      })
    }
  }
}