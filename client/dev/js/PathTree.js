/*
 * PathTree.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

var helper = require('./helper');
var tmpl = require('./tmpl')['Tmpl'];
var _proto = PathTree.prototype;

function PathTree() {
    if(!(this instanceof PathTree)) return new PathTree();

    this.pathVal = $('#path-val');
    this.rootTree = $('#path-tree');
};

_proto.bind = function() {
    ;
};

_proto.update = function(path) {
    // this.rootTree.html(tmpl['pathTree']({list: list}));
};

_proto.insert = function() {
    ;
};

module.exports = PathTree;
