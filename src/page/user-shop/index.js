/*
 * @Author: PsiloLau 
 * @Date: 2018-01-16 01:42:16 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-16 01:43:09
 */
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
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
    // 图片预览
    $(document).on('mouseenter', '.p-img-item', function () {
      var imageUrl = $(this).find('.p-img').attr('src');
      $('.main-img').attr('src', imageUrl);
    });

  },
  // 加载商品详情的数据
  loadDetail: function () {
    var _this = this,
      html = '',
      $pageWrap = $('.page-wrap');
    // loading
    $pageWrap.html('<div class="loading"></div>');
    // 请求detail信息
    _product.getProductDetail(this.data.productId, function (res) {
      _this.filter(res);
      // 缓存住detail的数据
      _this.data.detailInfo = res;
      // render
      html = _mm.renderHtml(templateIndex, res);
      $pageWrap.html(html);
    }, function (errMsg) {
      $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
    });
  },
  // 数据匹配
  filter: function (data) {
    data.subImages = data.subImages.split(',');
  }
};
$(function () {
  page.init();
})