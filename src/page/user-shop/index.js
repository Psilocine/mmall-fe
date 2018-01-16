/*
 * @Author: PsiloLau 
 * @Date: 2018-01-16 01:42:16 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-16 12:23:17
 */
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header-shop/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

var page = {
  data: {
    productId: _mm.getUrlParam('shopId') || '',
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    // 如果没有传productId, 自动跳回首页
    if (!this.data.productId) {
			alert('没有找到该店铺页面!')
      _mm.goHome();
    }
    this.loadDetail();
  },
  bindEvent: function () {
    var _this = this;
  },
  // 加载店铺详情的数据
  loadDetail: function () {
		
  }
};
$(function () {
  page.init();
})