/*
 * @Author: Rosen
 * @Date:   2017-05-18 19:30:12
 * @Last Modified by: PsiloLau
 * @Last Modified time: 2018-04-24 13:09:12
 */

'use strict';
require('./index.css');
var _mm = require('util/mm.js');
// 三级select框
var _dpd = require('util/distpicker/distpicker.data.js');
var _dp = require('util/distpicker/distpicker.js');

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
		$('#distpick').distpicker({
			autoSelect: false
		});
	},
	bindEvent: function () {
		var _this = this;
		// 点击搜索按钮以后，做搜索提交
		$('#search-btn').click(() => this.searchSubmit());

		// 搜索类型
		$('.search-item').click(function () {
			$('#searchType').html($(this).html())
			$('.search-list').css('visibility', 'hidden');
			$('.search-list').removeAttr('style');

		});

		// 按区域搜索
		$('.dist-btn').click(function () {
			if ($(this).html() === '按区域搜索') {
				$(this).html('取消');
				$('#distpick').css('display', 'block');
			} else {
				$(this).html('按区域搜索');
				$('#distpick').css('display', 'none');
			}
		})

		// 回车提交
		$('#search-input').keydown(function (e) {
			if (e.keyCode === 13) {
				_this.searchSubmit();
			}
		})

		// 点击搜索type 出现搜索list 适配移动端
		$('.search-type').click(function () {
			$('.search-list').css('visibility', 'visible');
			$('.search-list').removeAttr('style');
		})
	},
	// 搜索的提交
	searchSubmit: function () {
		let keyword = $.trim($('#search-input').val()),
			type = $('#searchType').html(),
			province = $("[search-province] option:selected").val(),
			city = $("[search-city] option:selected").val(),
			district = $("[search-district] option:selected").val();
		let query = ''
		if (province) {
			query = `&province=${province}`
			if (city) {
				query += `&city=${city}`
				if (district) {
					query += `&district=${district}`
				}
			}
		}
		if (type === '商品') {
			// 如果提交的时候有keyword,正常跳转到list页
			if (keyword) {
				window.location.href = './list.html?keyword=' + keyword + query;
			}
			// 如果keyword为空，直接返回首页
			else {
				_mm.goHome();
			}
		} else if (type === '店铺') {
			if (keyword) {
				window.location.href = './shop-list.html?keyword=' + keyword + query;
			}
			// 如果keyword为空，直接返回首页
			else {
				_mm.goHome();
			}
		}
	}
};

header.init();