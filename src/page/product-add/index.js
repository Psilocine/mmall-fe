/*
 * @Author: PsiloLau 
 * @Date: 2017-12-25 15:03:05 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2017-12-28 18:39:26
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product.js')
var templateIndex = require('./index.string');

// page 逻辑部分
var page = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    // 初始化左侧菜单
    navSide.init({
      name: 'product-add'
    });
    // 加载用户信息
    this.loadProductInfo();
  },
  bindEvent: function() {

  },
  // 加载用户信息
  loadProductInfo: function () {
    var userHtml = _mm.renderHtml(templateIndex, '');
    $('.panel-body').html(userHtml);
  }
};
$(function () {
  page.init();
});