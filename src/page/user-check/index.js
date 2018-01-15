/*
 * @Author: PsiloLau 
 * @Date: 2017-12-18 11:59:54 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-16 00:39:04
 */
'use strict';
require("./indes.css");
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('node_modules/bootstrap/dist/css/bootstrap.min.css')
require('node_modules/bootstrap/dist/js/bootstrap.min.js')

var navSide = require('page/common/nav-side/index.js');

var _mm = require('util/mm.js');
var _user = require('service/user.js');
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
    $(document).on('click', '.pasBtn', function () {
      var userId = $(this).siblings('.id-input').val(),
        role = $(this).siblings('.role-input').val();
      if (window.confirm("确定要通过该用户审核吗")) {
        _user.getUserPass(userId, role, 1, function (res, msg) {
          _mm.successTips(msg);
          _this.loadUserInfo();
        }, function (errMsg) {
          _mm.errorTips(errMsg);
        })
      }
    })
    $(document).on('click', '.refBtn', function () {
      var userId = $(this).siblings('.id-input').val(),
        role = $(this).siblings('.role-input').val();
      if (window.confirm("确定要忽略该用户审核吗")) {
        _user.getUserPass(userId, role, 2, function (res, msg) {
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
      name: 'user-check'
    });
    // 加载用户信息
    this.loadUserInfo();
  },
  // 加载用户信息
  loadUserInfo: function () {
    var frag = `<span class='text-primary pull-right'>申请等级: 1 国, 2 省, 3 市, 4 区</span>
                <table class="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>用户名</th>
                      <th>姓名</th>
                      <th>电话</th>
                      <th>省份</th>
                      <th>城市</th>
                      <th>区/县</th>
                      <th>具体地址</th>
                      <th>店铺名称</th>
                      <th>申请身份</th>
                      <th>申请等级</th>
                      <th>操作</th>
                    </tr>
                  </thead>`
    var listParam = this.data.listParam;
    _user.getUserList(listParam, function (res) {
      for (var i = 0, len = res.list.length; i < len; i++) {
        var userHtml = '';

        res.list[i].role === "2" ? res.list[i].roleIden = '批发商' : res.list[i].roleIden = '实体店';

        userHtml = _mm.renderHtml(templateIndex, res.list[i]);
        frag += userHtml;
      }
      if (len === 0) {
        frag += '<tr><td class="text-center" colspan="11">还没有用户申请</td></tr>'
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