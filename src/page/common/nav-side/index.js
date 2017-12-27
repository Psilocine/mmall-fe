/*
 * @Author: Rosen
 * @Date:   2017-05-19 17:39:14
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2017-12-27 15:56:29
 */
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

// 不同身份用户侧边栏选项不同
_user.getUserInfo(function (res) {
  switch (res.role) {
    // 管理员
    case "1":
    navSide.option.navList.push({
        name: 'user-check',
        desc: '用户审核',
        href: './user-check.html'
      });
      break;
      // 普通用户
    case "0":
    navSide.option.navList.push({
        name: 'user-upgrade',
        desc: '会员升级',
        href: './user-upgrade.html'
      });
      break;
      // 批发商
    case "2":
    navSide.option.navList.push({
        name: 'product-add',
        desc: '商品添加',
        href: './product-add.html'
      }, {
        name: 'product-manage',
        desc: '商品管理',
        href: './product-manage.html'
      });
      break;
      // 实体店
    case "3":
    navSide.option.navList.push({
        name: 'product-add',
        desc: '商品添加',
        href: './product-add.html'
      }, {
        name: 'product-manage',
        desc: '商品管理',
        href: './product-manage.html'
      });
      break;
    default:
      console.log("can't find the role code")
      break;
  }
}, function (errMsg) {
  _mm.errorTips(errMsg);
});

// 侧边导航
var navSide = {
  option: {
    name: '',
    navList: [{
        name: 'user-center',
        desc: '个人中心',
        href: './user-center.html'
      },
      {
        name: 'user-pass-update',
        desc: '修改密码',
        href: './user-pass-update.html'
      }
    ]
  },
  init: function (option) {
    // 合并选项  
    $.extend(this.option, option);
    this.option.navList.push(      {
      name: 'user-pass-update',
      desc: '修改密码',
      href: './user-pass-update.html'
    });
    this.renderNav();
  },
  // 渲染导航菜单
  renderNav: function () {
    // 计算active数据
    for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
      if (this.option.navList[i].name === this.option.name) {
        this.option.navList[i].isActive = true;
      }
    };
    console.log(iLength);
    // 渲染list数据
    var navHtml = _mm.renderHtml(templateIndex, {
      navList: this.option.navList
    });
    // 把html放入容器
    $('.nav-side').html(navHtml);
  }
};

module.exports = navSide;