/*
 * @Author: Rosen
 * @Date:   2017-05-23 19:33:33
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2017-12-29 16:49:07
 */

'use strict';

import ProductSave from './index.jsx';
import React from 'react';
import { render } from 'react-dom';


// bootstrap
import 'node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'node_modules/bootstrap/dist/js/bootstrap.min.js';
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

render(
  <ProductSave />,
  document.getElementById('panel-body')
)
// page 逻辑部分
var page = {
	init: function () {
		this.onLoad();
	},
	onLoad: function () {
		// 初始化左侧菜单
		navSide.init({
			name: 'product-add'
		});
	},
}
$(function () {
	page.init();
});