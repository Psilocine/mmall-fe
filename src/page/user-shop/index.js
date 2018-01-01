/*
 * @Author: PsiloLau 
 * @Date: 2018-01-01 15:11:27 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-01 22:08:44
 */
'use strict';
require('./index.css')
require('page/common/nav/index.js');
require('page/common/header-shop/index.js');

var _product = require('service/product.js');
var page = {
	init: function () {
		this.onLoad();
	},
	onLoad: function () {
		// 加载商品信息
		this.loadShop();
	},
	// 加载商品
	loadShop: function () {
    // var listParam = this.data.listParam;
		// _product.getProductList(listParam,function (res) {
    //   var userHtml = '';
    //   for(var i = 0; i < res.length; i++) {
    //     userHtml += _mm.renderHtml(templateIndex, res);
    //   }
		// 	$('.floor-list').html(userHtml);
		// }, function (errMsg) {
		// 	_mm.errorTips(errMsg);
		// });
	}
};
$(function () {
	page.init();
});
