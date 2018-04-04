/*
 * @Author: Rosen
 * @Date:   2017-05-27 18:26:52
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-04-04 13:05:54
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
  // 获取全部商品列表
  getAllProductList: function (listParam, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/product/list_all.do'),
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
  // 获取店铺产品详细信息
  getShopProduct: function (shopId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/product/shop_product_list.do'),
      data: {
        shopId: shopId
      },
      success: resolve,
      error: reject
    });
  },
  // 获取店铺信息
  getShopDetail: function (shopname, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/product/shop_detail.do'),
      data: {
        shopname: shopname
      },
      success: resolve,
      error: reject
    });
  },
  // 删除商品
  deleteProduct: function (productId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/product/delete.do'),
      data: {productId: productId},
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 管理员删除商品
  deleteProductByAdmin: function (productId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/product/delete_by_admin.do'),
      data: {productId: productId},
      method: 'POST',
      success: resolve,
      error: reject
    });
  }
}
module.exports = _product;