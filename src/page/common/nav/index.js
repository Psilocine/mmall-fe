/*
 * @Author: Rosen
 * @Date:   2017-05-17 14:17:01
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-04-26 13:14:39
 */

'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
// 导航
var nav = {
  init: function () {
    this.bindEvent();
    this.loadUserInfo();
    return this;
  },
  bindEvent: function () {
    // 登录点击事件
    $('.js-login').click(function () {
      _mm.doLogin();
    });
    // 注册点击事件
    $('.js-register').click(function () {
      window.location.href = './user-register.html';
    });
    // 退出点击事件
    $('.js-logout').click(function () {
      _user.logout(function (res) {
        window.location.href = './index.html';
      }, function (errMsg) {
        _mm.errorTips(errMsg);
      });
    });
  },
  // 加载用户信息
  loadUserInfo: function () {
    _user.checkLogin(function (res) {
      $('.nav-list.login').show();
      $('.user.not-login').hide().siblings('.user.login').show()
        .find('.username').text(res.username);
    }, function (errMsg) {
      // do nothing
    });
  },
};

module.exports = nav.init();