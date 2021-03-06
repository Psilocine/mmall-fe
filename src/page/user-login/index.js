/*
 * @Author: Rosen
 * @Date:   2017-05-08 22:26:19
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-20 14:49:09
 */
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

var pageWrap = document.getElementsByClassName('page-wrap')[0];
var userCon = document.getElementById('userCon');
var clientH = document.documentElement.clientHeight;

// 80是footer高度 61是header高度
var pH = clientH - 80 - 61;
var sH = (pH - userCon.offsetHeight) / 2;

pageWrap.style.height = pH + 'px';
userCon.style.top = sH + 'px';

// 表单里的错误提示
var formError = {
	show: function (errMsg) {
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide: function () {
		$('.error-item').hide().find('.err-msg').text('');
	}
};

// page 逻辑部分
var page = {
	init: function () {
		this.bindEvent();
	},
	bindEvent: function () {
		var _this = this;
		// 登录按钮的点击
		$('#submit').click(function () {
			_this.submit();
		});
		// 如果按下回车，也进行提交
		$('.user-content').keyup(function (e) {
			// keyCode == 13 表示回车键
			if (e.keyCode === 13) {
				_this.submit();
			}
		});
	},
	// 提交表单
	submit: function () {
		var formData = {
				username: $.trim($('#username').val()),
				password: $.trim($('#password').val())
			},
			// 表单验证结果
			validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {
			_user.login(formData, function (res) {
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			}, function (errMsg) {
				formError.show(errMsg);
			});
		}
		// 验证失败
		else {
			// 错误提示
			formError.show(validateResult.msg);
		}

	},
	// 表单字段的验证
	formValidate: function (formData) {
		var result = {
			status: false,
			msg: ''
		};
		if (!_mm.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		// 通过验证，返回正确提示
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};
$(function () {
	page.init();
});