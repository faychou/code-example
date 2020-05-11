const AlipaySdk = require('alipay-sdk').default; // 引入 SDK
const { appId, publicKey, privateKey, gateway } = require('../config/alipay.config');

// 只需要初始化一次，后续调用不同的 API 都可以使用同一个 alipaySdk 对象
const alipaySdk =  new  AlipaySdk({
  appId: appId, // 开放平台上创建应用时生成的 appId
  signType: 'RSA2', // 签名算法,默认 RSA2
  gateway: gateway, // 支付宝网关地址 ，沙箱环境下使用时需要修改
  alipayPublicKey: publicKey, // 支付宝公钥，需要对结果验签时候必填
  privateKey: privateKey, // 应用私钥字符串
});

module.exports = alipaySdk;