/*
 * @Author: Rosen
 * @Date:   2017-05-28 19:45:49
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-27 17:36:56
 */

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header-shop/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _user = require('service/user-service.js');
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
      $pageWrap = $('.page-wrap');
    // loading
    $pageWrap.html('<div class="loading"></div>');
    // 请求detail信息
    _product.getProductDetail(this.data.productId, function (res) {
      // 店铺名
      $('.shop-name span').html(res.shopname);
      // 面包屑链接
      _product.getShopDetail(res.shopname, function (shopRes) {
        $('.shop-link').html(shopRes.shopname).attr('href','./user-shop.html?shopId=' + shopRes.id);
      }, function (errMsg) {
        console.log('shop_detail.do error');
      });

      _this.filter(res);
      // 缓存住detail的数据
      _this.data.detailInfo = res;
      // render
      html = _mm.renderHtml(templateIndex, res);
      $pageWrap.html(html);

      // 商家地址 联系方式渲染
      _user.getShopOwner(res.username, function (userRes) {
        console.log( '商家信息');
        console.log(userRes);
        $('.shop-addr').html(userRes.province + userRes.city + userRes.district + userRes.addr);
        $('.shop-phone').html(userRes.phone);

        // 0127 按地区显示批发价格
        _user.checkLogin(function(res) {
          console.log(res);
          // 确定用户是批发商
          if(res.role === '2') {
            switch(res.lvl) {
              // 全国等级
              case '1':
                $('.pifa-price').css('opacity','1');
                break;
              // 全省 同省显示批发价
              case '2':
                if(res.province === userRes.province) {
                  $('.pifa-price').css('opacity','1');
                }
                break;
              // 全市 同市显示批发价
              case '3':
                if(res.province === userRes.province && res.city === userRes.city) {
                  $('.pifa-price').css('opacity','1');                  
                }
                break;
              // 全区/县 相同区县才显示批发价
              case '4':
                if(res.province === userRes.province && res.city === userRes.city && res.district === userRes.district) {
                  $('.pifa-price').css('opacity','1');                                    
                }
                break;
              default:
                console.log('匹配不到用户等级');
                break;
            }
          }
        }, function (err) {
          // 未登录, 批发价移除 不显示
          $('.pifa-price').remove();
        })
        // 0127 end


      }, function (errMsg) {
        console.log(errMsg);
      })



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