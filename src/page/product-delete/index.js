/*
 * @Author: PsiloLau 
 * @Date: 2018-03-20 23:34:18 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-03-21 00:27:21
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

require('node_modules/bootstrap/dist/css/bootstrap.min.css')
require('node_modules/bootstrap/dist/js/bootstrap.min.js')

var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

// 分页器
var Pagination = require('util/pagination/index.js');

// page 逻辑部分
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
  bindEvent: function () {
    // 点击提交按钮后的动作
    var _this = this;
    $(document).on('click', '.search-product-btn', function () {
      listParam = _this.data.listParam;
      var key = $('.search-product-input').val();
      listParam.keyword = key;

      _product.getProductList(listParam, function (res) {
        console.log(res);
      })
    })

    $(document).on('click', '.del-btn', function () {
      var productInfo = {
        productId: $(this).siblings('.id-input').val()
      }
      if (window.confirm("确定把该商品删除吗")) {
        _user.getDowngrade(productInfo, function (res, msg) {
          _mm.successTips(msg);
          _this.loadProductInfo();
        }, function (errMsg) {
          _mm.errorTips(errMsg);
        })
      }
    })
  },
  onLoad: function () {
    // 初始化左侧菜单
    navSide.init({
      name: 'product-delete'
    });
    // 加载用户信息
    this.loadProductInfo();
  },
  // 加载用户信息
  loadProductInfo: function () {
    var _this = this;
    var frag = `<table class="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>商品名</th>
                      <th>描述</th>
                      <th>店铺名称</th>
                      <th>操作</th>
                    </tr>
                  </thead>`
    var listParam = this.data.listParam;

    $('.panel-body .user-info').html('<div class="loading"></div>');
    // _user.getUserListToDown(listParam, function (res) {
    //   console.log(res);
    //   for (var i = 0, len = res.list.length; i < len; i++) {
    //     var userHtml = '';

    //     userHtml = _mm.renderHtml(templateIndex, res.list[i]);
    //     frag += userHtml;
    //   }
      
    //   frag += '</table>';
    //   $('.panel-body .user-info').html(frag);
    //   _this.loadPagination({
		// 		hasPreviousPage: res.hasPreviousPage,
		// 		prePage: res.prePage,
		// 		hasNextPage: res.hasNextPage,
		// 		nextPage: res.nextPage,
		// 		pageNum: res.pageNum,
		// 		pages: res.pages
		// 	});
    // }, function (errMsg) {
    //   _mm.errorTips(errMsg);
    //   location.href = "./user-center.html";
    // });
  },
  // 加载分页信息
	loadPagination: function (pageInfo) {
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({}, pageInfo, {
			container: $('.pagination'),
			onSelectPage: function (pageNum) {
				_this.data.listParam.pageNum = pageNum;
				_this.loadProductInfo();
			}
		}));
	}
};
$(function () {
  page.init();
});
