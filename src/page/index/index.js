/*
* @Author: PsiloLau
* @Date:   2017-05-08 15:19:12
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-20 15:20:51
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/myscroll/index.js');
var navSide         = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _mm             = require('util/mm.js');

$(function() {
	// 渲染banner的html
	var bannerHtml  = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	// 初始化banner
	$('.banner-con').myscroll({
		picElem: $('#carousel'),
		ctrlElem: $('#ctrl'),
		isLibs: true, //是否创建底部小圆点(样式均可自定义调整),默认向lib添加单独类名，详情见调用后dom结构
		isArrows: true, //是否创建左右箭头(样式均可自定义调整)
		autoPlay: true, //是否自动播放
		playTime: 2500, //自动播放间隔时间
		playSpeed: 300, //图片切换速度 
		effect: 'left'
	});
});
