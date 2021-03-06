/*
 * @Author: PsiloLau 
 * @Date: 2017-12-12 19:27:20 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-04-23 00:19:01
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('node_modules/bootstrap/dist/css/bootstrap.min.css')
require('node_modules/bootstrap/dist/js/bootstrap.min.js')

var navSide = require('page/common/nav-side/index.js');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');
// 分页器
var Pagination = require('util/pagination/index.js');
// page 逻辑部分
var page = {
  data: {
    listParam: {
      listType: 'list',
      searchType: 'productName',
      pageNum: _mm.getUrlParam('pageNum') || 1,
			pageSize: _mm.getUrlParam('pageSize') || 10
    }
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  bindEvent: function () {
    // 点击提交按钮后的动作
    var _this = this;
    // lookBtn
    // $(document).on('click', '.lookBtn', function () {
    //   this.href = './detail.html?productId=' + productId;
    // })
    // delBtn
    $(document).on('click', '.delBtn', function () {
      if (window.confirm("确定要删除该商品吗")) {
      var productId = $('.delBtn').siblings('input').val();    
        _product.deleteProduct(productId, function (res, msg) {
          _mm.successTips(msg);
          _this.loadProductInfo();
        }, function (errMsg) {
          _mm.errorTips(errMsg);
        })
      }
    });
    $(document).on('click', '.ediBtn', function () {
      var productId = $(this).siblings('input').val();
            
    })

  },
  onLoad: function () {
    // 初始化左侧菜单
    navSide.init({
      name: 'product-manage'
    });
    // 加载用户信息
    this.loadProductInfo();
  },
  // 加载用户信息
  loadProductInfo: function () {
    var frag = `<table class="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>图片</th>
                      <th>信息</th>
                      <th>价格</th>
                      <th>操作</th>
                    </tr>
                  </thead>`
    var _this = this;
    var listParam = this.data.listParam;
    _product.getProductListByShop(listParam, function (res) {
      for (var i = 0, len = res.list.length; i < len; i++) {
        var userHtml = '';
        userHtml = _mm.renderHtml(templateIndex, res.list[i]);
        frag += userHtml; 
      }
      if(len === 0) {
        frag += '<tr><td class="text-center" colspan="4">还没有添加任何商品</td></tr>'
      }

      frag += '</table>';
      $('.panel-body').html(frag);
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
      console.log('permission denied');
      location.href = './user-center.html';
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
				_this.loadProductInfo();
			}
		}));
	}
};
$(function () {
  page.init();
});