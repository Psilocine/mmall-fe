/*
 * @Author: Rosen
 * @Date:   2017-05-23 19:52:16
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-04-16 22:16:20
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
// 三级select框
var _dpd = require('util/distpicker/distpicker.data.js');
var _dp = require('util/distpicker/distpicker.js');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

// page 逻辑部分
var page = {
	init: function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function () {
		// 初始化左侧菜单
		navSide.init({
			name: 'user-upgrade'
		});
		// 加载用户信息
		this.loadUserInfo();

	},
	bindEvent: function () {
		var _this = this;
		// 点击提交按钮后的动作
		$(document).on('change', '#role', function () {
			if($('#role option:selected').val() === '3') {
				console.log('3');
				$('#lvlBox').css('display', 'inline-block');
			} else if($('#role option:selected').val() === '2') {
				console.log('2');
				$('#lvlBox').css('display', 'none');
			}
		});

		$(document).on('click', '.btn-submit', function () {
			var userInfo = {
					username: $('#username').html(),
					name: $.trim($('#name').val()),
					phone: $.trim($('#phone').val()),
					lvl: $('#lvl option:selected').val(),
					role: $('#role option:selected').val(),
					province: $("[data-province] option:selected").val(),
					city: $("[data-city] option:selected").val(),
					district: $("[data-district] option:selected").val(),
					addr: $.trim($('#addr').val()),
					shopname: $.trim($('#shopname').val())
				},
				validateResult = _this.validateForm(userInfo);
			if (validateResult.status) {
				// 升级会员
				_user.userUpgrade(userInfo, function (res, msg) {
					_mm.successTips(msg);
					window.location.href = './user-center.html';
				}, function (errMsg) {
					_mm.errorTips(errMsg);
				});
			} else {
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	
	// 加载用户信息
	loadUserInfo: function () {
		var userHtml = '';
		_user.getUserInfo(function (res) {
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
			$('#target').distpicker();
		},function(errMsg){
				_mm.errorTips(errMsg);
		});
	},
	// 验证字段信息
	validateForm: function (formData) {
		var result = {
			status: false,
			msg: ''
		};
		// 验证姓名
		if (!_mm.validate(formData.name, 'name')) {
			result.msg = '请正确填写姓名';
			return result;
		}
		// 验证手机号
		if (!_mm.validate(formData.phone, 'phone')) {
			result.msg = '您的手机号格式不正确';
			return result;
		}
		// 验证地址
		if (!_mm.validate(formData.addr, 'addr')) {
			result.msg = '您的地址不能为空';
			return result;
		}
		// 验证店铺名
		if (!_mm.validate(formData.shopname, 'shopname')) {
			result.msg = '您的店铺名不能为空';
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