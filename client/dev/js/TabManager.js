/*
 * TabManager.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

var util = require('util');
var helper = require('./helper');
var FilePanel = require('./FilePanel');
var EditorPanel = require('./EditorPanel');
var _proto = TabManager.prototype;

function TabManager() {
    if(!(this instanceof TabManager)) return new TabManager();

    this.panelNav = $('#panels-tab-nav');
    this.panelContent = $('#panels-tab-content');
    this.navPrefix = 'tab-nav-';
    this.contentPrefix = 'tab-content-';
    this.uuids = [];

    this.bind();
};

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
_proto.add = function(name, type, index) {
    index = index || 0;

    var uuid = helper.uuid(10, 10);
    var navId = this.navPrefix + uuid;
    var contentId = this.contentPrefix + uuid;
    var navStr = '<li id="' + navId + '">\
            <a href="#' + contentId + '" data-toggle="tab">' + name + '</a>\
            <i class="glyphicon glyphicon-remove close-tab" data-uuid="' + uuid + '" title="close"></i>\
        </li>';
    var contentStr = type === 'files' ?
        '<div class="file-list tab-pane" id="' + contentId + '"></div>' :
        '<div class="tab-pane" id="' + contentId + '"></div>';
    var tabs = this.panelNav.find('> li');
    var prevTab = this.panelNav.find('li:eq(' + (index - 1) + ')');

    if(!index || !prevTab.length) {
        this.panelNav.append(navStr);
    } else {
        $(navStr).insertAfter(prevTab);
    }

    this.panelContent.append(contentStr);

    this.select(uuid);

    this.uuids.push({
        uuid: uuid,
        type: type
    });

    this.createPanel(type, uuid);
};

_proto.createPanel = function(type, uuid) {
    type === 'files' ? new FilePanel() : new EditorPanel();
};

_proto.select = function(uuid) {
    // this.panelNav.find('.active').removeClass('active');
    $('#' + this.navPrefix + uuid).trigger('click');
};

_proto.tabSwitch = function() {
    ;
};

_proto.destroy = function(uuid) {
    $('#' + this.navPrefix + uuid).remove();
    $('#' + this.contentPrefix + uuid).remove();
    this.uuids = _.filter(this.uuids, function(o) {return o.uuid != uuid;});
};
