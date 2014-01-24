/*
 * EditorPanel.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var _proto = EditorPanel.prototype;

function EditorPanel() {
    if(!(this instanceof EditorPanel)) return new EditorPanel();

    EventEmitter.prototype.call(this);

    this.prefix = 'editor';
    this.editors = [];
    this.defaultSettings = {
        theme: 'monokai'
    };
};

util.inherits(EditorPanel, EventEmitter);

_proto.add = function(elId, settings) {
    if(!elId) throw Error('Element id is required.');

    var editor = ace.edit(elId);
    var session = editor.getSession();

    settings = $.extend(this.defaultSettings, settings || {});

    editor.setShowPrintMargin(false);
    // editor.setHighlightActiveLine(false);
    editor.setShowPrintMargin(false);
    editor.setAutoScrollEditorIntoView();
    editor.setTheme('ace/theme/' + settings.theme);
    settings.mode && session.setMode('ace/mode/' + settings.mode);
    settings.value && editor.setValue(settings.value);
    // session.setUseWrapMode(true);
};

_proto.destroy = function() {
    ;
};
