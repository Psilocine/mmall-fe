/*
 * @Author: PsiloLau 
 * @Date: 2018-03-20 21:36:11 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-03-20 22:11:16
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');


// page 逻辑部分
var page = {
  data: {
    listParam: {
      listType: 'list',
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
    $(document).on('click', '.downBtn', function () {
      var userId = $(this).siblings('.id-input').val(),
        role = $(this).siblings('.role-input').val();
      if (window.confirm("确定把该用户降为普通用户吗")) {
        _user.getDowngrade(userId, function (res, msg) {
          _mm.successTips(msg);
          _this.loadUserInfo();
        }, function (errMsg) {
          _mm.errorTips(errMsg);
        })
      }
    })
  },
  onLoad: function () {
    // 初始化左侧菜单
    navSide.init({
      name: 'user-downgrade'
    });
    // 加载用户信息
    this.loadUserInfo();
  },
  // 加载用户信息
  loadUserInfo: function () {
    var frag = `<table class="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>用户名</th>
                      <th>姓名</th>
                      <th>电话</th>
                      <th>店铺名称</th>
                      <th>操作</th>
                    </tr>
                  </thead>`
    var listParam = this.data.listParam;
    _user.getUserListToDown(listParam, function (res) {
      for (var i = 0, len = res.list.length; i < len; i++) {
        var userHtml = '';

        userHtml = _mm.renderHtml(templateIndex, res.list[i]);
        frag += userHtml;
      }
      
      frag += '</table>';
      $('.panel-body').html(frag);
    }, function (errMsg) {
      _mm.errorTips(errMsg);
      location.href = "./user-center.html";
    });
  }
};
$(function () {
  page.init();
});
