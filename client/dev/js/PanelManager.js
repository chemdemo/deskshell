/*
 * PanelManager.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

var helper = require('./helper');
var FilePanel = require('./FilePanel');
var EditorPanel = require('./EditorPanel');

var PanelManager = module.exports = function() {
    if(!(this instanceof PanelManager)) return new PanelManager();

    this.panelNav = $('#panels-tab-nav');
    this.panelContent = $('#panels-tab-content');
    this.navPrefix = 'tab-nav-';
    this.contentPrefix = 'tab-content-';
    this.editorPanelSettings = {
        theme: 'monokai'
    };
    this.filePanelSettings = {};

    this.panels = {};

    this.bind();
};

var _proto = PanelManager.prototype;

_proto.bind = function() {
    var self = this;
    var t;

    this.panelNav.on('click', '.close-tab', function closeTab(e) {
        e.stopPropagation();
        self.destroy($(this).attr('data-uuid'));
    });

    this.panelNav.on('dragstart', '> li', function onMousedown(e) {
        t = e.target;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('x', e.pageX);
        e.dataTransfer.setDragImage(e.target, 0, 0);
    });

    this.panelNav.on('dragend', '> li', function onMousedown(e) {
        e.dataTransfer.clearData('x');
    });

    this.panelNav.on('dragover dragenter', '> li', function onMousedown(e) {
        e.preventDefault();
    });

    this.panelNav.on('dragend', '> li', function onMousedown(e) {
        x = e.pageX;
    });

    this.panelNav.on('drop', '> li', function onMouseup(e) {
        e.preventDefault();

        var diff = e.pageX - e.dataTransfer.getData('x');
        var self;
        var w;
        var p;

        if(!diff) return;

        self = $(this);
        w = self.offsetWidth();
        p = self.parent();

        console.log(e.target === t);
    });
};

// name => tab title
// type => typeof tab: files || editor
// index => where the tabs will be inserted
_proto.add = function(options) {
    var name = options.name;
    var type = options.type;
    var data = options.data;
    var index = options.index || 0;

    var uuid = helper.uuid(10, 10);
    var navId = this.navPrefix + uuid;
    var contentId = this.contentPrefix + uuid;
    var navStr = '<li id="' + navId + '">\
            <a href="#' + contentId + '" data-toggle="tab">' + name + '</a>\
            <i class="glyphicon glyphicon-remove close-tab" data-uuid="' + uuid + '" title="close"></i>\
        </li>';
    var contentStr = '<div class="' + (type === 'files' ? 'file-list' : 'ace-editor')\
            + ' tab-pane" id="' + contentId + '">\
            <div class="loading">loading...</div>\
        </div>';
    var tabs = this.panelNav.find('> li');
    var prevTab = this.panelNav.find('li:eq(' + (index - 1) + ')');

    if(!index || !prevTab.length) {
        this.panelNav.append(navStr);
    } else {
        $(navStr).insertAfter(prevTab);
    }

    this.panelContent.append(contentStr);

    this.select(uuid);

    this.createPanel(type, uuid, data);
};

_proto.createPanel = function(type, uuid, data) {
    var id = this.contentPrefix + uuid;
    var panel = type === 'files' ?
        new FilePanel(id, this.editorPanelSettings, data) :
        new EditorPanel(id, this.filePanelSettings, data);

    o[uuid] = panel;

    this.panels[uuid] = {type: type, panel: panel};
};

_proto.select = function(uuid) {
    // this.panelNav.find('.active').removeClass('active');
    $('#' + this.navPrefix + uuid).trigger('click');
};

_proto.editorsSet = function(name, value) {
    var panels = this.panels;
    var fn;

    try {
        _(_(panels).keys()).each(function(uuid) {
            name = 'set' + name[0].toUpperCase() + name.slice(1);
            fn = panels[uuid][name];
            fn && fn(value);
        });
    } catch(e) {
        console.error(e);
    }
};

_proto.tabSwitch = function() {
    ;
};

_proto.remove = function(uuid) {
    $('#' + this.navPrefix + uuid).remove();
    $('#' + this.contentPrefix + uuid).remove();

    delete this.panels[uuid];
};
