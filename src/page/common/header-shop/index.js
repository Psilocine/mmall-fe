/*
 * @Author: PsiloLau 
 * @Date: 2018-01-01 15:29:55 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-01 18:31:00
 */
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 通用页面头部
var header = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    var keyword = _mm.getUrlParam('keyword');
    // keyword存在，则回填输入框
    if (keyword) {
      $('#search-input').val(keyword);
    };
    var currentUser = _user.getUserInfo(function(res) {
      $('.shop-name').html(res.shopname); 
    }, function (err) {
      console.log(err);
    });
  },
  bindEvent: function () {
    var _this = this;
    // 点击搜索按钮以后，做搜索提交
    $('#search-btn').click(function () {
      _this.searchSubmit();
    });
    // 搜索本店按钮
    $('#search-shop').click(function () {
      _this.searchShop();
    });
  },
  // 搜索的提交
  searchSubmit: function () {
    var keyword = $.trim($('#search-input').val());
    // 如果提交的时候有keyword,正常跳转到list页
    if (keyword) {
      window.location.href = './list.html?keyword=' + keyword;
    }
    // 如果keyword为空，直接返回首页
    else {
      _mm.goHome();
    }
  },
  // 搜索本店
  searchShop() {
    var keyword = $.trim($('#search-input').val());
    // 如果提交的时候有keyword,正常跳转到list页
    if (keyword) {
      window.location.href = './list.html?keyword=' + keyword;
    }
    // 如果keyword为空，直接返回首页
    else {
      _mm.goHome();
    }
  }
};

header.init();