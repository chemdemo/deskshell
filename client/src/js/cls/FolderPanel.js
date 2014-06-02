/**
 * FolderPanel.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

'use strict';

var jst = require('../tmpl')['JST'];
var _proto = FolderPanel.prototype;

function FolderPanel(id, data) {
    if(!(this instanceof FolderPanel)) return new FolderPanel(id, data);

    this.id = id;

    if(data) this.fill(data);
};

_proto.fill = function(list) {
    $('#' + this.id).html(jst['fileList']({list: $.isArray(list) ? list : [list]}));
};

_proto.setContent = function() {
    ;
};

module.exports = FolderPanel;
