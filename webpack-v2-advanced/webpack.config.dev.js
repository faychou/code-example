const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.config.base');

module.exports = merge(baseWebpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  module: {
    rules: [
      { // 语法检查
        test: /\.jsx?$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.(css|less)$/, // 要处理的文件
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
        include: path.resolve(__dirname, "src"), // 包含目录，，提高打包速度
      },
    ]
  },
  devServer: {
    // contentBase: path.join(__dirname, "dist"), // 本地服务器所加载的页面所在的目录，设置 HtmlPlugin 后失效
    historyApiFallback: true, // 当设置为 true 时，任意的 404 响应都可能需要被替代为 index.html
    compress: true, //开启 Gzip 压缩
    port: 9090,
    hot: true,
    // open: true, //自动打开浏览器
    stats: "errors-only", // 终端仅打印 error，可以避免太多的编译信息打印
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false, // 接受 运行在 https 上的服务
        pathRewrite: {"^/api" : "/"}
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() //热更新插件
  ]
});