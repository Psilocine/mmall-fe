/*
 * @Author: PsiloLau 
 * @Date: 2018-05-01 22:54:55 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-05-01 23:15:18
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
var templateIndex = require('./index.string');

// 分页器
var Pagination = require('util/pagination/index.js');


// page 逻辑部分
var page = {
  data: {
    listParam: {
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
    $(document).on('click', '.delBtn', function () {
      var userId = parseInt($(this).siblings('.id-input').val())
      if (window.confirm("确定把该用户注销吗")) {
        _user.userDelete(userId, function (res, msg) {
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
      name: 'user-delete'
    });
    // 加载用户信息
    this.loadUserInfo();
  },
  // 加载用户信息
  loadUserInfo: function () {
    var _this = this,
      userHtml = '',
      listParam = this.data.listParam;
      
    let frag = `<span class='text-primary pull-right'>注: 只显示普通会员, 删除批发商/实体商户需先降级</span>
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>用户名</th>
                            <th>邮箱</th>
                            <th>操作</th>
                        </tr>
                        </thead>`;
		console.log(_this.data.listParam.pageNum);

    $('.panel-body .user-info').html('<div class="loading"></div>');
    _user.getNormalUserList(listParam, function (res) {
        userHtml = _mm.renderHtml(templateIndex, {
          list: res.list
        });
        frag += userHtml;
      
      frag += '</table>';
      $('.panel-body .user-info').html(frag);
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
      location.href = "./user-center.html";
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
				_this.loadUserInfo();
			}
		}));
	}
};
$(function () {
  page.init();
});
