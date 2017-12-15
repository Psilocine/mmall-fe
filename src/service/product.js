/*
 * @Author: PsiloLau 
 * @Date: 2017-12-12 19:15:42 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2017-12-15 17:41:57
 */
'use strict';

var _mm = require('util/mm.js');
var _product = {
  getProduct: function (productId, resolve, reject) {
    return _mm.request({
      url: _mm.getServerUrl('/product/detailB.do'),
      data: {
        productId: productId || 0
      },
      success: resolve,
      error: reject
    });
  },
  // 获取商品信息
  getProductList: function (listParam, resolve, reject) {
    return _mm.request({
      url: _mm.getServerUrl('/product/listB.do'),
      data: listParam,
      success: resolve,
      error: reject
    });

  },
  // 获取商品信息
  saveProduct: function (product, resolve, reject) {
    return _mm.request({
      url: _mm.getServerUrl('/product/save.do'),
      data: product,
      success: resolve,
      error: reject
    });
  },
  // 删除商品
  deleteProduct: function (productId, resolve, reject) {
    return _mm.request({
      url: _mm.getServerUrl('/product/delete.do'),
      data: productId,
      success: resolve,
      error: reject
    });
  },
  // 改变商品状态
  setProductStatus: function (productId, status, resolve, reject) {
    return _mm.request({
      url: _mm.getServerUrl('/product/set_sale_status.do'),
      data: {
        productId: productId,
        status: status
      },
      success: resolve,
      error: reject
    });
  },
  // 获取品类
  getCategory: function (parentCategoryId, resolve, reject) {
    return _mm.request({
      url: _mm.getServerUrl('/category/get_category.do'),
      data: {
        categoryId: parentCategoryId || 0
      },
      success: resolve,
      error: reject
    });
  },
  // 更新品类名称
  updateCategoryName: function (category, resolve, reject) {
    return _mm.request({
      url: _mm.getServerUrl('/category/set_category_name.do'),
      data: category,
      success: resolve,
      error: reject
    });
  }
}

module.exports = _product;