/*
 * @Author: PsiloLau 
 * @Date: 2017-12-12 19:27:20 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2017-12-14 17:41:50
 */
'use strict';
require('./index.scss');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('')
var navSide = require('page/common/nav-side/index.js');

var _mm = require('util/mm.js');
var _product = require('service/product.js');
var templateIndex = require('./index.string');

// page 逻辑部分
var page = {
  init: function () {
    this.onLoad();
    this.bindEvent();
    
  },
  bindEvent: function () {
    var _this = this;
    // 点击提交按钮后的动作
    $(document).on('click', '.status-btn', function (productId, status) {
      var sattusChangeTips = status == '下架' ? '确认要下架该商品?' : '确认要上架该商品?';
      if (window.confirm(sattusChangeTips)) {
        // 更改用户信息
        _product.setProductStatus(productId, status, function (res, msg) {
          _mm.successTips(msg);
          this.loadProductInfo();
        }, function (errMsg) {
          _mm.errorTips(errMsg);
        });
      }
    });
  },
  onLoad: function () {
    // 初始化左侧菜单
    navSide.init({
      name: 'product-manage'
    });
    // 加载用户信息
    this.loadProductInfo();
  },
  // 加载用户信息
  loadProductInfo: function () {
    var userHtml = '';
    _product.getProductList(function (res) {
      console.log(res);
      switch(res.status) {
        case 1:
          // 1在售
          res.status = '下架';
          break;
        case 2:
          // 2下架状态
          res.status = '上架';
          break;
        default: 
          break;
      }
      userHtml = _mm.renderHtml(templateIndex, res);
      $('.panel-body').html(userHtml);
    }, function (errMsg) {
      _mm.errorTips(errMsg);
    });
  }
};
$(function () {
  page.init();
});