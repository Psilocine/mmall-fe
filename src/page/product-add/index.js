'use strict';

import ProductSave from './index.jsx';
import React from 'react';
import { render } from 'react-dom';

// 'promise未定义 低版本ie报错'
import 'babel-polyfill';

// bootstrap
import 'node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'node_modules/bootstrap/dist/js/bootstrap.min.js';
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide = require('page/common/nav-side/index.js');

var _user = require('service/user-service.js');

// page 逻辑部分
var page = {
	init: function () {
		this.onLoad();
	},
	// 判断用户类型 渲染批发价格是否显示
	bindEvent: function () {
		_user.getUserInfo(function (res){
			// 是批发用户显示
			if(res.role === '2') {
				$('#pifaForm').css('display', 'block');
			}
		}, function (errMsg) {
			console.log(errMsg);
		})
	},
	onLoad: function () {
		// 初始化左侧菜单
		navSide.init({
			name: 'product-add'
		});
		render(
			<ProductSave />,
			document.getElementById('panel-body')
		);
		this.bindEvent();
	},
}
$(function () {
	page.init();
});