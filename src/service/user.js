/*
 * @Author: PsiloLau 
 * @Date: 2017-12-25 14:24:11 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-03-20 22:19:56
 */
'use strict';

var _mm = require('util/mm.js');

var _user = {
  // 检查用于登录的信息是否合法
  checkLoginInfo(userInfo) {
    if (!userInfo.username) {
      return {
        state: false,
        msg: '用户名不能为空'
      }
    }
    if (!userInfo.password) {
      return {
        state: false,
        msg: '密码不能为空'
      }
    }
    return {
      state: true,
      msg: '验证通过'
    }
  },
  // 获取审核用户名单
  getUserList(listParam, resolve, reject) {
    return _mm.request({
      url: _mm.getServerUrl('/user/get_user_list.do'),
      data: {
        pagaNum: listParam.pageNum || 1
      },
      success: resolve,
      error: reject
    });
  },
  // 审核通过
  getUserPass(userId, role, status, resolve, reject) {
    return _mm.request({
      url: _mm.getServerUrl('/user/user_pass.do'),
      data: {
        userId: userId,
        role: role,
        status: status
      },
      success: resolve,
      error: reject
    });
  }
}

module.exports = _user;