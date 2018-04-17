/*
 * @Author: PsiloLau
 * @Date:   2017-05-08 15:19:12
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-04-17 12:39:21
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/myscroll/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var Pagination = require('util/pagination/index.js');

var page = {
	data: {
		shitiParam: {
			pageNum: _mm.getUrlParam('pageNum') || 1,
			pageSize: _mm.getUrlParam('pageSize') || 10
		},
		pifaParam: {
			pageNum: _mm.getUrlParam('pageNum') || 1,
			pageSize: _mm.getUrlParam('pageSize') || 10
		}
	},
	init: function () {
		this.onLoad();
	},
	onLoad: function () {
		this.loadBanner();
		this.loadShitiList();
		this.loadPifaList();
	},
	loadShitiList() {
		let _this = this,
			listHtml = '',
			$content = $('#shitiList'),
			pageinfo = this.data.shitiParam;
		_user.getShitiList(pageinfo, function (res) {
			listHtml = _mm.renderHtml(templateIndex, {
				list: res.list
			});
			$content.html(listHtml);
			_this.loadPaginationShiti({
				hasPreviousPage: res.hasPreviousPage,
				prePage: res.prePage,
				hasNextPage: res.hasNextPage,
				nextPage: res.nextPage,
				pageNum: res.pageNum,
				pages: res.pages
			});
		}, function (errMsg) {
			_mm.errorTips(errMsg);
		})
	},
	loadPifaList() {
		let _this = this,
			listHtml = '',
			$content = $('#pifaList'),
			pageinfo = this.data.pifaParam;

		_user.getPifaList(pageinfo, function (res) {
			listHtml = _mm.renderHtml(templateIndex, {
				list: res.list
			});
			$content.html(listHtml);
			_this.loadPaginationPifa({
				hasPreviousPage: res.hasPreviousPage,
				prePage: res.prePage,
				hasNextPage: res.hasNextPage,
				nextPage: res.nextPage,
				pageNum: res.pageNum,
				pages: res.pages
			});
		}, function (errMsg) {
			_mm.errorTips(errMsg);
		})
	},
	loadBanner() {
		// 渲染banner的html
		var bannerHtml = _mm.renderHtml(templateBanner);
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
	},
	loadPaginationShiti: function (pageInfo) {
		var _this = this;
		let paginationShiti;
		paginationShiti ? '' : (paginationShiti = new Pagination());
		paginationShiti.render($.extend({}, pageInfo, {
			container: $('.pagination-shiti'),
			onSelectPage: function (pageNum) {
				_this.data.shitiParam.pageNum = pageNum;
				_this.loadShitiList();
			}
		}));
	},
	loadPaginationPifa: function (pageInfo) {
		var _this = this;
		let paginationPifa;
		paginationPifa ? '' : (paginationPifa = new Pagination());
		paginationPifa.render($.extend({}, pageInfo, {
			container: $('.pagination-pifa'),
			onSelectPage: function (pageNum) {
				_this.data.pifaParam.pageNum = pageNum;
				_this.loadPifaList();
			}
		}));
	}
};
$(function () {
	page.init();
})