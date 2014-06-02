/*
 * TermManager.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

'use strict';

var EventEmitter = Terminal.EventEmitter;
var inherits = Terminal.inherits;
var TermTab = require('./TermTab');
var helper = require('../helper');

var TermManager = module.exports = function() {
    if(!(this instanceof TermManager)) return new TermManager();

    this.termNav = $('#terms-tab-nav');
    this.termContent = $('#terms-tab-content');
    this.terms = {};

    var self = this;
    var socket = this.socket = io.connect('/term');

    socket.on('connect', function() {
        console.log('Term socket connected.');
        self.bind();
    });

    socket.on('data', function(id, data) {
        var term = self.terms[id];

        term.write(data);
    });
};

inherits(TermManager, Terminal);

var _proto = TermManager.prototype;

_proto.bind = function() {
    var self = this;
    var terms = this.terms;

    $('#term-plus').on('click', this.add.bind(this));

    this.termNav.on('click', '> li > a', function(e) {
        e.preventDefault();

        var self = $(this);
        var id;

        if(self.hasClass('active')) return;

        id = self.attr('href').replace(/#term-/, '');
        terms[id].emit('focus');
        self.tab('show');
    });

    this.termNav.on('click', '.close-tab', function(e) {
        var p = $(this).parent();
        var id = p.attr('id').replace(/nav-/, '');

        self.remove.call(self, id);
    });
};

_proto.add = function(e) {
    var self = this;
    var id = helper.uuid(6);
    var socket = this.socket;
    var termNav = $('<li id="nav-' + id + '" class="none">\
            <a href="#term-' + id + '" data-toggle="tab">term-' + id + '</a>\
            <i class="glyphicon glyphicon-remove close-tab" title="close"></i>\
        </li>');
    var termContent = $('<div class="tab-pane term none" id="term-' + id + '"></div>');
    var actived = this.termNav.find('.active');
    var term;

    actived.length ? termNav.insertAfter(actived) : this.termNav.append(termNav);
    this.termContent.append(termContent);

    term = new TermTab(this, {
        cols: 80,
        rows: 8,
        id: id
    });

    term.on('open', function() {
        // self.emit('open', id);
        console.log('Term [%s] opened.', id);
        $('#term-' + id).removeClass('none');
        $('#nav-' + id).removeClass('none').trigger('click');
        $('#nav-' + id).find('> a').trigger('click');
    });
    term.on('focus', function() {
        console.log('Term [%s] focused!', id);
        term.focus();
        self.focusId = id;
    });
    term.on('destroy', this.remove.bind(this));
    // term.on('process', term.setProcess);

    this.terms[id] = term;
};

_proto.remove = function(id) {
    var term = this.terms[id];
    var nav = $('#nav-' + id);

    // term.emit('destroy');
    term.destroy();
    delete this.terms[id];
    this.socket.emit('kill', id);

    // select previous one
    if(id === this.focusId) {
        this.authSelect(id);
    } else {
        $('#nav-' + id).remove();
    }
};

_proto.authSelect = function(startId) {
    var self = this;
    var p = this.termNav;
    var el = $('#nav-' + startId);
    var terms = this.terms;
    var _remove = function() {
        $('#nav-' + startId).remove();
    };
    var _select = function(el) {
        _remove();
        el.find('> a').trigger('click');
    };
    var els = p[0].querySelectorAll('li');
    var len = els.length;

    if(!len || len < 2) return _remove();

    for(var i=0; i<len; i++) {
        if(els[i].id === 'nav-' + startId) {
            if(i > 0) return _select(p.find('> li:eq(' + (i - 1) + ')'));
            else return _select(p.find('> li:eq(' + (i + 1) + ')'));
        }
    }
};
