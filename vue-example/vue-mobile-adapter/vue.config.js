const pxtorem = require('postcss-pxtorem');

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 75, // 基准值
            propList: ['*'] // 决定哪些属性值自动转换，如：propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
          })
        ]
      }
    }
  },
}