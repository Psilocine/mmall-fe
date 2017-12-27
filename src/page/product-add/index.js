/*
 * @Author: PsiloLau 
 * @Date: 2017-12-25 15:03:05 
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2017-12-25 15:03:47
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            switch(res.role) {
                case "0":
                    res.role = '会员';
                    break;
                case "1":
                    res.role = '管理员';
                    break;
                case '2':
                    res.role = '批发商';
                    break;
                case "3":
                    res.role = '实体店用户';
                    break;
                default: 
                    console.log('Error user type');
            }
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};
$(function(){
    page.init();
});