'use strict';

import ProductSave from './index.jsx';
import React from 'react';
import { render } from 'react-dom';

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
			if(res.role === 3) {
				$('#pifaForm').css('display', 'none');
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
	},
}
$(function () {
	page.init();
	page.bindEvent();
});