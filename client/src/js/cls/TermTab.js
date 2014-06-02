/*
 * TermTab.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

'use strict';

var EventEmitter = Terminal.EventEmitter;
var inherits = Terminal.inherits;
var on = Terminal.on;
var off = Terminal.off;
var cancel = Terminal.cancel;
var helper = require('../helper');

var TermTab = module.exports = function(mgr, options) {
    if(!(this instanceof TermTab)) return new TermTab(mgr, options);

    var self = this;
    var mgr = this.mgr = mgr;
    var cols = options.cols;
    var rows = options.rows;

    Terminal.call(this, {
        cols: cols,
        rows: rows
    });

    this.socket = mgr.socket;
    this.id = options.id;
    this.open(document.getElementById('term-' + this.id));

    // this.on('open', this.openHandle);
    // this.on('focus', this.focusHandle);
    // this.on('process', this.setProcess);

    this.socket.emit('create', this.id, cols, rows, function(err, data) {
        if(err) return self.emit('destroy', self.id);

        self.pty = data.pty;
        self.setProcess(data.process);
        self.emit('open');
    });
};

inherits(TermTab, Terminal);

var _proto = TermTab.prototype;

_proto.handler = function(data) {
    this.socket.emit('data', this.id, data);
};

_proto.openHandle = function() {
    this.mgr.emit('open', this.id);
};

_proto.setProcess = function(name) {
    name = helper.sanitize(name);

    this.process = name;

    // this.emit('process', this.id);
    $('#nav-' + this.id).attr('title', name);
};

_proto.focusHandle = function() {
    this.mgr.emit('focus', this.id);
    this.focus();
};

// var _destroy = this.destroy;
// _proto.destroy = function() {
//     this.mgr.emit('destroy', this.id);
//     _destroy();
// };
