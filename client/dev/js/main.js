/**
 * main.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

'use strict';

var DeskShell = module.exports = {};

var ui = require('./ui');
var tmpl = require('./tmpl')['Tmpl'];
var mock = require('./mock_data');
var TermManager = require('./TermManager');

new TermManager();

$('#files').html(tmpl['fileList']({list: mock.fileList}));
