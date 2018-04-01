/*
 * @Author: Rosen
 * @Date:   2017-05-17 17:04:32
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-04-01 22:37:07
 */

'use strict';

var _mm = require('util/mm.js');

var _user = {
	// 用户登录
	login: function (userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/login.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	// 检查用户名
	checkUsername: function (username, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/check_valid.do'),
			data: {
				type: 'username',
				str: username
			},
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	// 用户注册
	register: function (userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/register.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	// 检查登录状态
	checkLogin: function (resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	// 获取用户密码提示问题
	getQuestion: function (username, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/forget_get_question.do'),
			data: {
				username: username
			},
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	// 检查密码提示问题答案
	checkAnswer: function (userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/forget_check_answer.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	// 重置密码
	resetPassword: function (userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/forget_reset_password.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	// 获取用户信息
	getUserInfo: function (resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/get_information.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	// 更新个人信息
	updateUserInfo: function (userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/user_upgrade.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	// 升级会员等级
	userUpgrade: function (userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/user_upgrade.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	// 登录状态下更新密码
	updatePassword: function (userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/reset_password.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	// 登出
	logout: function (resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	// 获取店铺拥有者信息
	getShopOwner(username, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/shop_owner.do'),
			method: 'POST',
			data: {
				username: username
			},
			success: resolve,
			error: reject
		})
	},
  // 获取用户名单
  getUserListToDown(listParam, resolve, reject) {
    return _mm.request({
      url: _mm.getServerUrl('/user/get_user_list_down.do'),
      data: {
				pageNum: 2,
				pageSize: listParam.pageSize
			},
      success: resolve,
      error: reject
    });
  },
	// 用户降级
	getDowngrade(userId, resolve, reject) {
		return _mm.request({
			url: _mm.getServerUrl('/user/user_downgrade.do'),
			method: 'POST',
			data: {
				userId: userId
			},
			success: resolve,
			error: reject
		});
	}
}
module.exports = _user;