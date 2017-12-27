/*
* @Author: Rosen
* @Date:   2017-05-23 19:33:33
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2017-12-27 16:32:35
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
        navSide.roleIdenDiff();
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
                    res.roleIden = '会员';
                    break;
                case "1":
                    res.roleIden = '管理员';
                    break;
                case '2':
                    res.roleIden = '批发商用户';
                    res.gradeUp = 'true';
                    break;
                case "3":
                    res.roleIden = '实体店用户';
                    res.gradeUp = 'true';                    
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