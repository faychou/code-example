const merge = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离 CSS 文件
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|less)$/, // 要处理的文件
        use: [{
          loader: MiniCssExtractPlugin.loader, // 替换之前的 style-loader
          // options: { // 修改 css 文件后自动刷新，生产环境不需要
          //   hmr: process.env.NODE_ENV === 'development', // 是否开启热重载
          //   reloadAll: true // 如果上一项开启之后无效，记得配置这里
          // }
        }, 'css-loader', 'postcss-loader', 'less-loader'],
        include: path.resolve(__dirname, "src"), // 包含目录，，提高打包速度
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 每次打包前先清空 output.path 设置的文件夹中文件
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:7].css', // 注意这里使用的是contenthash，否则任意的js改动，打包时都会导致css的文件名也跟着变动。
      chunkFilename: 'static/css/[name].[contenthash:7].css',
    }),
    new OptimizeCssPlugin(), // 将抽离的 CSS 压缩
  ]
});