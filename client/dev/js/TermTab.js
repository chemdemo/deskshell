/*
 * TermTab.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

'use strict';

var EventEmitter = Terminal.EventEmitter;
var inherits = EventEmitter.inherits;
var on = Terminal.on;
var off = Terminal.off;
var cancel = Terminal.cancel;

var TermTab = module.exports = function(options) {
    if(!(this instanceof TermTab)) return new TermTab(options);

    var self = this;
    var cols = options.cols;
    var rows = options.rows;

    Terminal.call(this, {
        cols: cols,
        rows: rows
    });

    this.socket = options.socket;
    this.elId = options.elId;
    this.open(document.getElementById('#term-' + this.elId));
    this.focused = true;

    this.socket.emit('create', cols, rows, function(err, data) {
        if(err) return self.destroy();

        self.pty = data.pty;
        self.id = data.id;
        self.setProcess(data.process);
        self.emit('open');
    });
};

var _proto = TermTab.prototype;

inherits(TermTab, Terminal);

_proto.handler = function(data) {
    this.socket.emit('data', this.id, data);
};

_proto.setProcess = function(name) {
    name = sanitize(name);

    this.emit('process', name);

    // $('#nav-' + this.elId).attr('title', name);
};

var _focus = _proto.focus;
_proto.focus = function() {
    this.emit('focus');
    _focus();
};

var _destroy = this.destroy;
_proto.destroy = function() {
    this.emit('destroy');
    _destroy();
};
