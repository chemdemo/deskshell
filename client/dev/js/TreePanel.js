/*
 * PathTree.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

var helper = require('./helper');
var tmpl = require('./tmpl')['Tmpl'];
var _proto = TreePanel.prototype;

function TreePanel(panelMgr) {
    if(!(this instanceof TreePanel)) return new TreePanel(panelMgr);

    this.panelMgr = panelMgr;
    this.socket = panelMgr.socket;
    this.pathVal = $('#path-val');
    this.rootTree = $('#path-tree');

    this.render(panelMgr.serverConfig.cwd);
};

_proto.bind = function() {
    ;
};

_proto.render = function(path) {
    var self = this;
    var s = '<ul>';

    this.socket.emit('read-path', function(err, list) {
        if(err) return console.error('list path error:', err);
        s += tmpl['pathTree']({list: $.isArray(list) ? list : [list]});
        s += '</ul>';
        self.rootTree.html(s);
    });
};

_proto.insert = function(path) {
    ;
};

module.exports = TreePanel;
