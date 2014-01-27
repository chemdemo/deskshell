/*
 * TermManager.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

var TermManager = module.exports = function() {
    if(!(this instanceof TermManager)) return new TermManager();

    this.termNav = $('#terms-tab-nav');
    this.termContent = $('#terms-tab-content');

    var self = this;
    var socket = this.socket = io.connect('/fs');

    socket.on('connect', function() {
        var term = self.term = new Terminal({
            cols: ,
            rows: ,
            userStyle: true,
            screenKeys: true
        });
    });

    this.bind();
};

var _proto = TermManager.prototype;

_proto.bind = function() {
    ;
};

_proto.add = function() {
    ;
};
