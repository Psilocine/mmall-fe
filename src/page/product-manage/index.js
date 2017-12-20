/*
 * @Author: PsiloLau 
 * @Date: 2017-12-12 19:27:20 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2017-12-18 14:06:15
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('node_modules/bootstrap/dist/css/bootstrap.min.css')
require('node_modules/bootstrap/dist/js/bootstrap.min.js')

var navSide = require('page/common/nav-side/index.js');

var _mm = require('util/mm.js');
var _product = require('service/product.js');
var templateIndex = require('./index.string');

// page 逻辑部分
var page = {
  data: {
    listParam: {
      listType: 'list',
      searchType: 'productName',
      pageNum: 1
    }
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  bindEvent: function () {
    // 点击提交按钮后的动作
    var _this = this;
    $(document).on('click', '.delBtn', function () {
      var productId = $(this).siblings('input').val();
      if (window.confirm("确定要删除该商品吗")) {
        _product.deleteProduct(productId, function (res, msg) {
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
                      <th>信息</th>
                      <th>价格</th>
                      <th>操作</th>
                    </tr>
                  </thead>`
    var listParam = this.data.listParam;
    _product.getProductList(listParam, function (res) {
      for (var i = 0; i < res.list.length; i++) {
        var userHtml = '';

        userHtml = _mm.renderHtml(templateIndex, res.list[i]);
        if(userHtml === '') {
          frag += '<tr class="colspan="3"">还没有添加任何商品</tr>'
          break;
        }
        frag += userHtml;
      }
      frag +='</table>';
      $('.panel-body').html(frag);
    }, function (errMsg) {
      _mm.errorTips(errMsg);
    });
  }
};
$(function () {
  page.init();
});