/*
 * TermManager.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

'use strict';

var EventEmitter = Terminal.EventEmitter;
var inherits = EventEmitter.inherits;
var TermTab = require('./TermTab');
var helper = require('./helper');

var TermManager = module.exports = function() {
    if(!(this instanceof TermManager)) return new TermManager();

    this.termNav = $('#terms-tab-nav');
    this.termContent = $('#terms-tab-content');
    this.terms = {};

    var self = this;
    var socket = this.socket = io.connect('/term');

    this.on('open', function(elId) {
        // term created!
        helper.log('Term [%d] opened.', elId);
        $('#term-' + elId).removeClass('none');
        $('#nav-' + elId).removeClass('none').trigger('click');
    });

    this.on('focus', function(elId) {
        // $('#nav-' + elId).removeClass('none');
        // reconnect ...
    });

    socket.on('connect', function() {
        self.bind();
    });
};

inherits(TermManager, Terminal);

var _proto = TermManager.prototype;

_proto.bind = function() {
    var self = this;
    var terms = this.terms;

    $('#term-plus').on('click', this.add);

    this.termNav.on('click', '> li > a', function(e) {
        e.preventDefault();

        var self = $(this);
        var id;

        if(self.hasClass('active')) return;

        id = self.attr('href').replace(/#term-/, '');
        Terminal.focus.focused = false;
        terms[id].emit('focus');
        self.tab('show');
    });

    this.termNav.on('click', '.close-tab', function(e) {
        var p = $(this).parent();
        self.remove(p.attr('id').replace(/#nav-/, ''));
    });
};

_proto.add = function(e) {
    var self = this;
    var elId = helper.uuid();
    var socket = this.socket;
    var termNav = $('<li id="nav-' + elId + '" class="none">\
            <a href="#term-' + elId + '" data-toggle="tab">term-' + elId + '</a>\
            <i class="glyphicon glyphicon-remove close-tab" title="close"></i>\
        </li>');
    var termContent = $('<div class="tab-pane term none" id="term-"' + elId + '></div>');
    var term;

    this.termNav.append(termNav);
    this.termContent.append(termContent);

    term = new TermTab(this, {
        socket: socket,
        cols: 100,
        rows: 30,
        elId: elId
    });

    this.terms[elId] = term;
};

_proto.remove = function(elId) {
    var term = this.terms[elId];
    var nav = $('#nav-' + elId);

    term.emit('destroy');
    term = this.terms[elId] = null;

    // select previous one
    if(term === Terminal.focus) this.switch(elId);
    $('#nav-' + elId).remove();
};

_proto.switch = function(currId) {
    var self = this;
    var p = this.termNav;
    var el = $('#nav-' + currId);
    var terms = this.terms;
    var _select = function(el) {
        el.find('> a').trigger('click');
    };
    var els = p[0].querySelectorAll('> li');
    var len = els.length;

    if(!len || len < 2) return;

    for(var i=0; i<len; i++) {
        if(els[i].id === '#nav-' + currId) {
            if(i === 0) return _select(p.find('> li:eq(' + (i + 1 ) + ')'));
            else return _select(p.find('> li:eq(' + (i - 1 ) + ')'));
        }
    }
};
