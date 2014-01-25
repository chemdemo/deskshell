/*
 * EditorPanel.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

var _proto = EditorPanel.prototype;

function EditorPanel(elId, data, settings) {
    if(!(this instanceof EditorPanel)) return new EditorPanel(elId, data, settings);

    this.init(elId, data, settings);
};

_proto.init = function(elId, data, settings) {
    if(!elId) throw Error('Element id is required.');

    this.elId = elId;

    var editor = this.editor = ace.edit(elId);
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
