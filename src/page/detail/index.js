/*
 * @Author: Rosen
 * @Date:   2017-05-28 19:45:49
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-20 17:17:48
 */

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header-shop/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

var pageWrap = document.getElementsByClassName('page-wrap')[0];
var clientH = document.documentElement.clientHeight;

// 80是footer高度 216是header+crumb+nav高度
var pH = clientH - 216 - 80;

pageWrap.style.height = pH + 'px';

var page = {
  data: {
    productId: _mm.getUrlParam('productId') || '',
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    // 如果没有传productId, 自动跳回首页
    if (!this.data.productId) {
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
      shopname = '',
      $pageWrap = $('.page-wrap');
    // loading
    $pageWrap.html('<div class="loading"></div>');
    // 请求detail信息
    _product.getProductDetail(this.data.productId, function (res) {
      // 店铺名
      shopname = res.shopname;
      $('.shop-name span').html(shopname);

      _this.filter(res);
      // 缓存住detail的数据
      _this.data.detailInfo = res;
      // render
      html = _mm.renderHtml(templateIndex, res);
      $pageWrap.html(html);
    }, function (errMsg) {
      $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
    });

    // 面包屑链接
    _product.getShopDetail(shopname, function (res) {
      $('.shop-link').html(res.shopname).attr('href','./user-shop.html?shopId=' + res.id);
    }, function (errMsg) {
      console.log('shop_detail.do error');
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