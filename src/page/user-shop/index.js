/*
 * @Author: PsiloLau 
 * @Date: 2018-01-16 01:42:16 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-20 19:48:26
 */
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header-shop/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
  data: {
    shopId: _mm.getUrlParam('shopId') || '',
    pageNum: _mm.getUrlParam('pageNum') || 1,
    pageSize: _mm.getUrlParam('pageSize') || 20
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    // 如果没有传productId, 自动跳回首页
    if (!this.data.shopId) {
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
    var _this = this,
			listHtml = '',
			listParam = this.data.listParam,
			$pListCon = $('.goods-list');
		$pListCon.html('<div class="loading"></div>');
		_product.getShopProduct(this.data.shopId, function (res) {
			$('.shop-name span').html(res.list[0].shopname);
			// res.list 按修改时间 排序
			_this.orderByUpdateTime(res);

			listHtml = _mm.renderHtml(templateIndex, {
				list: res.list
			});
			$pListCon.html(listHtml);
			_this.loadPagination({
				hasPreviousPage: res.hasPreviousPage,
				prePage: res.prePage,
				hasNextPage: res.hasNextPage,
				nextPage: res.nextPage,
				pageNum: res.pageNum,
				pages: res.pages
			});
		}, function (errMsg) {
			_mm.errorTips(errMsg);
    });
  },
  loadPagination: function (pageInfo) {
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({}, pageInfo, {
			container: $('.pagination'),
			onSelectPage: function (pageNum) {
				_this.data.listParam.pageNum = pageNum;
				_this.loadList();
			}
		}));
	},
	orderByUpdateTime: function(data) {
		var temp;
		for(var i = 0, len = data.list.length; i < len; i++) {
			for(var j = 0; j < len - 1; j++) {
				if(data.list[j].updateTime < data.list[j + 1].updateTime) {
					temp = data.list[j];
					data.list[j] = data.list[j + 1];
					data.list[j + 1] = temp;
				}
			}
		}
	}
};
$(function () {
  page.init();
})