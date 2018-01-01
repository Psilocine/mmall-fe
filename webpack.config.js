/*
 * @Author: Rosen
 * @Date:   2017-05-08 15:28:19
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-01 15:04:47
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function (name, title) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    title: title,
    inject: true,
    hash: true,
    chunks: ['common', name]
  };
};
// webpack config
var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'list': ['./src/page/list/index.js'],
    'detail': ['./src/page/detail/index.js'],
    'user-login': ['./src/page/user-login/index.js'],
    'user-upgrade': ['./src/page/user-upgrade/index.js'],
    'user-register': ['./src/page/user-register/index.js'],
    'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
    'user-center': ['./src/page/user-center/index.js'],
    'user-center-update': ['./src/page/user-center-update/index.js'],
    'user-pass-update': ['./src/page/user-pass-update/index.js'],
    'product-manage': ['./src/page/product-manage/index.js'],
    'product-detail': ['./src/page/product-detail/index.js'],
    'product-add': ['./src/page/product-add/index.js'],
    'user-check': ['./src/page/user-check/index.js'],
    'user-shop': ['./src/page/user-shop/index.js'],
    'result': ['./src/page/result/index.js'],
  },
  output: {
    path: './dist',
    publicPath: WEBPACK_ENV === 'online' ? '//s.psilocine.cn/mmall-fe/dist/' : '/dist/',
    filename: 'js/[name].js'
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader!sass-loader',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=100&name=resource/[name].[ext]'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.string$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    alias: {
      node_modules: __dirname + '/node_modules',
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + '/src/image'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify("production") 
       }
    }),
    // 独立通用模块到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    // 把css单独打包到文件里
    new ExtractTextPlugin("css/[name].css"),
    // html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
    new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('product-add', '商品添加')),
    new HtmlWebpackPlugin(getHtmlConfig('product-detail', '商品详情')),
    new HtmlWebpackPlugin(getHtmlConfig('product-manage', '商品管理')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-shop', '店铺详情')),
    new HtmlWebpackPlugin(getHtmlConfig('user-upgrade', '会员升级')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    new HtmlWebpackPlugin(getHtmlConfig('user-check', '用户审核')),
  ]
};

if ('dev' === WEBPACK_ENV) {
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;