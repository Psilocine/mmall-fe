/*
 * @Author: PsiloLau 
 * @Date: 2018-01-16 01:07:16 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-16 01:42:42
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
  data: {
    listParam: {
      keyword: _mm.getUrlParam('keyword') || '',
      pageNum: _mm.getUrlParam('pageNum') || 1,
      pageSize: _mm.getUrlParam('pageSize') || 20
    }
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    this.loadList();
  },
  bindEvent: function () {
    var _this = this;
    $(document).on('click', '.shop-btn', function() {
      var shopId = $(this).sibings('.shop-id').val();
      location.href = "./user-shop.html" + "?shopId=" + shopId;
    })
  },
  // 加载list数据
  loadList: function () {
    var _this = this,
      listHtml = '',
      listParam = this.data.listParam,
      $pListCon = $('.p-list-con');
    $pListCon.html('<div class="loading"></div>');
    // 请求接口
    _product.getShopList(listParam, function (res) {
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
  // 加载分页信息
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
  }
};
$(function () {
  page.init();
})