const path = require('path');
const HtmlPlugin = require('html-webpack-plugin'); // 生成 HTML 文件

module.exports = {
  entry: __dirname + '/src/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/', // 线上部署，一般不填或 /，如果网站部署在非根目录，如网站首页地址为 https://www.faychou.cn/v1，则这里填 /v1
    filename: 'static/js/[name].[hash].js' // 打包后 js 文件名
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/, // 排除 node_modules 文件夹
        loader: 'babel-loader',  
        options: { // loader的可选项
          presets: ['@babel/preset-env', '@babel/preset-react'], // ES6 语法转换、JSX 语法转换
          plugins: [
            [ // 处理全局函数和优化 babel 编译
                '@babel/plugin-transform-runtime', {
                "corejs": 3
              }
            ],
            ["@babel/plugin-proposal-class-properties", { "loose": true }] // 支持还在实验性阶段的语法，如 public class field
          ]
        }
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|ttf|woff|woff2|eot)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240, // 超过指定大小的图片需要 file-loader 做路径处理
            name: 'static/images/[name].[hash:8].[ext]',
            esModule: false  // 可以允许在标签属性上使用 require 动态加载
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 导入的时候可以忽略文件的扩展名
    alias: { // 模块别名列表
      // 用 @ 直接指引到 src 目录下，如：'./src/main'可以写成、'@/main' 
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    new HtmlPlugin({
      title: "hello webpack", // title 标签的内容，设置了 template 失效
      template:'./public/index.html',  // html 引用模版
      favicon: './public/favicon.ico', // 打包后生效
      // hash: true, // 为静态资源生成 hash 值
      minify: { // 压缩 HTML文件
        removeComments: true, // 移除 HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        removeAttributeQuotes: true // 移除属性的引号
      }
    })
  ]
};