/*
 * @Author: PsiloLau 
 * @Date: 2018-03-20 23:34:18 
 * @Last Modified by:   PsiloLau 
 * @Last Modified time: 2018-03-20 23:34:18 
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

require('node_modules/bootstrap/dist/css/bootstrap.min.css')
require('node_modules/bootstrap/dist/js/bootstrap.min.js')

var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');
