/*
 * @Author: PsiloLau 
 * @Date: 2017-12-12 19:27:20 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2017-12-15 16:36:00
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var navSide = require('page/common/nav-side/index.js');

var _mm = require('util/mm.js');
var _product = require('service/product.js');
var templateIndex = require('./index.string');

// page 逻辑部分
var page = {
  data : {
    listParam : {
        keyword         : _mm.getUrlParam('keyword')    || '',
        categoryId      : _mm.getUrlParam('categoryId') || '',
        orderBy         : _mm.getUrlParam('orderBy')    || 'default',
        pageNum         : _mm.getUrlParam('pageNum')    || 1,
        pageSize        : _mm.getUrlParam('pageSize')   || 20
    }
},
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  bindEvent: function () {
    // 点击提交按钮后的动作
    $(document).on('click', '#delBtn', function () {
      var productId = $(this).sibling('input').val();

      if (window.confirm("确定要删除该商品吗")) {
        _product.deleteProduct(productId, function (res, msg) {
          _mm.successTips(msg);
          this.loadProductInfo();
        }, function (errMsg) {
          _mm.errorTips(errMsg);
        })
      }
    })
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
    var listParam   = this.data.listParam;
    _product.getProductList(listParam, function (res) {
      console.log(res);
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