/*
* @Author: Rosen
* @Date:   2017-05-19 17:39:14
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2017-11-29 22:56:57
*/
'use strict';
require('./index.css');
var _mm             = require('util/mm.js');
var templateIndex   = require('./index.string');
// 侧边导航
var navSide = {
    option : {
        name : '',
        navList : [
            {name : 'user-center', desc : '个人中心', href: './user-center.html'},
            {name : 'upload-product', desc : '商品添加', href: 'http://admin.psilocine.cn/#/product/save'},
            {name : 'manage-product', desc : '商品管理', href: 'http://admin.psilocine.cn/#/product/index'},
            // {name : 'order-list', desc : '我的订单', href: './order-list.html'},
            {name : 'user-pass-update', desc : '修改密码', href: './user-pass-update.html'},
            // {name : 'about', desc : '关于Mall', href: './about.html'}
        ]
    },
    init : function(option){
        // 合并选项
        $.extend(this.option, option);
        this.renderNav();
    },
    // 渲染导航菜单
    renderNav : function(){
        // 计算active数据
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };
        // 渲染list数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        // 把html放入容器
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;