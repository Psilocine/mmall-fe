/*
 * @Author: Rosen
 * @Date:   2017-05-18 19:30:12
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-01-04 19:27:44
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
		var _this = this;
		// 点击搜索按钮以后，做搜索提交
		$('#search-btn').click(function () {
			_this.searchSubmit();
		});

		// 选择搜索类型
		var outEvent,
			typeEvent;
		$('.search-type').hover(function () {
			clearTimeout(typeEvent);
			typeEvent = setTimeout(function () {
				$('.search-list').css('display', 'block');
			}, 500)
		}, function () {
			outEvent = setTimeout(function () {
				$('.search-list').css('display', 'none');
			}, 500)
		})

		$('.search-item').click(function () {
			$('#searchType').html($(this).html())
		})

		$('.search-list').hover(function () {
			clearTimeout(outEvent);
		}, function () {
			$(this).css('display', 'none')
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
			// 
			console.log(keyword);
		}

	}
};

header.init();