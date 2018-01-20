/*
 * @Author: Rosen
 * @Date:   2017-05-18 19:30:12
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-20 19:47:40
 */

'use strict';
require('./index.css');
var _mm = require('util/mm.js');
// 通用页面头部
var header = {
	init: function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function () {

		var keyword = _mm.getUrlParam('keyword');
		// keyword存在，则回填输入框
		if (keyword) {
			$('#search-input').val(keyword);
		};
	},
	bindEvent: function () {
		// 点击搜索按钮以后，做搜索提交
		$('#search-btn').click( () => this.searchSubmit() );
		// 选择搜索类型
		// hover出现列表
		var outEvent,
			inEvent;
		$('.search-type').hover(function () {
			clearTimeout(inEvent);
			inEvent = setTimeout( () => $('.search-list').css('display', 'block'), 500)
		}, function () {
			outEvent = setTimeout( () => $('.search-list').css('display', 'none'), 500)
		})
		// 点击出现列表
		$('.search-type').click( () => $('.search-list').css('display', 'block') )
		$('.search-list').hover( () => clearTimeout(outEvent), () => $(this).css('display', 'none') )
		$('.search-item').click(function () {
			$('#searchType').html($(this).html())
			$('.search-list').css('display','none');
		});

		$('#search-input').keydown(function (e) {
			if(e.keyCode === 13) {
				this.searchSubmit();
			}
		})
	},
	// 搜索的提交
	searchSubmit: function () {
		var keyword = $.trim($('#search-input').val()),
			type = $('#searchType').html();

		if (type === '商品') {
			// 如果提交的时候有keyword,正常跳转到list页
			if (keyword) {
				window.location.href = './list.html?keyword=' + keyword;
			}
			// 如果keyword为空，直接返回首页
			else {
				_mm.goHome();
			}
		} else if(type === '店铺') {
			if (keyword) {
				window.location.href = './shop-list.html?keyword=' + keyword;
			}
			// 如果keyword为空，直接返回首页
			else {
				_mm.goHome();
			}
		}
	}
};

header.init();