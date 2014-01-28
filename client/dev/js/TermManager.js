/*
 * TermManager.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

'use strict';

var TermTab = require('./TermTab');
var helper = require('./helper');

var TermManager = module.exports = function() {
    if(!(this instanceof TermManager)) return new TermManager();

    this.termNav = $('#terms-tab-nav');
    this.termContent = $('#terms-tab-content');
    this.terms = {};

    var self = this;
    var socket = this.socket = io.connect('/fs');

    socket.on('connect', function() {
        self.bind();
    });
};

var _proto = TermManager.prototype;

_proto.bind = function() {
    // dom events bind...
    // add()
    // remove()
    // add.on('click', this.add)
    // close.on('click', this.remove)
};

_proto.add = function() {
    var self = this;
    var elId = helper.uuid();
    var termNav = $('<li id="nav-' + elId + '" class="none">\
            <a href="#term-' + elId + '" data-toggle="tab">term-' + elId + '</a>\
            <i class="glyphicon glyphicon-remove close-tab" title="close"></i>\
        </li>');
    var termContent = $('<div class="tab-pane term none" id="term-"' + elId + '></div>');
    var term;

    this.termNav.append(termNav);
    this.termContent.append(termContent);

    term = new TermTab({
        socket: socket,
        cols: 100,
        rows: 30,
        elId: elId
    });

    this.terms[elId] = term;

    term.on('open', this.open.bind(this, elId));
    term.on('focus', this.focus.bind(this, elId));
    term.on('process', this.process.bind(this, elId));
    term.on('destroy', this.destroy.bind(this, elId));
};

_proto.open = function(elId) {
    ;
};

_proto.focus = function(elId) {
    ;
};

_proto.process = function(elId) {
    var term = this.terms[elId];

    $('#nav-' + elId).attr('title', term.process);
};

_proto.destroy = function(elId) {
    ;
};

_proto.remove = function(elId) {
    var term = this.terms[elId];
    var nav = $('#nav-' + elId);

    $('#nav-' + elId).remove();
    term = this.terms[elId] = null;

    // select previous one
    this.switchTab();
};

_proto.switchTab = function(elId) {
    var self = this;
    var p = this.termNav;
    var el = $('#nav-' + elId);
    var _select = function(el) {
        el.find('> a').trigger('click');
    };

    if(elId && el.length) return _select(el);

    p.find('> li').each(function(i, node) {
        if(node.id === '#nav-' + Terminal.focus.elId) {
            el = p.find('> li:eq(' + (i-1) + ')');

            if(node.length) {
                return _select(node);
            }
        }
    });
};
