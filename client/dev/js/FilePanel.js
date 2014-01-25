/**
 * FilePanel.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

'use strict';

var tmpl = require('./tmpl')['Tmpl'];
var _proto = FilePanel.prototype;

function FilePanel(elId, data, settings) {
    if(!(this instanceof FilePanel)) return new FilePanel(elId, data, settings);

    this.init(elId, data, settings);
};

_proto.init = function(elId, data, settings) {
    $(elId).html(tmpl['fileList']({list: data}));
};

_proto.setContent = function() {
    ;
};

module.exports = FilePanel;
