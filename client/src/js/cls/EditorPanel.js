/*
 * EditorPanel.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

var _proto = EditorPanel.prototype;

function EditorPanel(id, data, settings) {
    if(!(this instanceof EditorPanel)) return new EditorPanel(id, data, settings);

    this.init(id, data, settings);
};

_proto.init = function(id, data, settings) {
    if(!id) throw Error('Element id is required.');

    this.id = id;

    var editor = this.editor = ace.edit(id);
    var session = this.session = editor.getSession();

    editor.setShowPrintMargin(false);
    // editor.setHighlightActiveLine(false);
    editor.setShowPrintMargin(false);
    editor.setAutoScrollEditorIntoView();
    this.setTheme(settings.theme);
    settings.mode && this.setMode(settings.mode);
    // session.setUseWrapMode(true);
    this.setValue(data || '');
};

_proto.setTheme = function(theme) {
    this.editor.setTheme('ace/theme/' + theme);
};

_proto.setMode = function(mode) {
    this.session.setTheme('ace/mode/' + mode);
};

_proto.setValue = function(value) {
    this.editor.setValue(value);
};

_proto.destroy = function() {
    ;
};

module.exports = EditorPanel;
