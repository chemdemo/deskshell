/**
 * main.js
 * Copyright (c) 2013-2014, dmyang (MIT License)
 */

'use strict';

var DeskShell = module.exports = {};

var fileMgr = require('./file_manager');
var ui = require('./ui');
var tmpl = require('./tmpl');
var mock = require('./mock_data');

// $('#path-tree').html(tmpl["Tmpl"]["pathTree"]({list: mock.pathList}));
$('#files').html(tmpl["Tmpl"]["fileList"]({list: mock.fileList}));
