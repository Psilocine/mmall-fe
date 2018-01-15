/*
 * @Author: Rosen
 * @Date:   2017-05-27 18:26:52
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-16 01:31:01
 */

'use strict';

var _mm = require('util/mm.js');

var _product = {
  // 获取商品列表
  getProductList: function (listParam, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/product/list.do'),
      data: listParam,
      success: resolve,
      error: reject
    });
  },
  // 获取商品详细信息
  getProductDetail: function (productId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/product/detail.do'),
      data: {
        productId: productId
      },
      success: resolve,
      error: reject
    });
  },
  // 获取店铺列表
  getShopList: function (listParam, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/product/shop_list.do'),
      data: listParam,
      success: resolve,
      error: reject
    });
  },
}
module.exports = _product;