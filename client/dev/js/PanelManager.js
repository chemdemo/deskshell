/*
 * PanelManager.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

'use strict';

var helper = require('./helper');
var TreePanel = require('./TreePanel');
var FolderPanel = require('./FolderPanel');
var EditorPanel = require('./EditorPanel');

var PanelManager = module.exports = function(conf) {
    if(!(this instanceof PanelManager)) return new PanelManager(conf);

    var self = this;
    var treePanel;
    var socket = this.socket = io.connect('/fs');

    this.serverConfig = conf;
    this.panelNav = $('#panels-tab-nav');
    this.panelContent = $('#panels-tab-content');
    this.navPrefix = 'tab-nav-';
    this.contentPrefix = 'tab-content-';
    this.editorPanelSettings = {
        theme: 'monokai'
    };
    this.folderPanelSettings = {};

    treePanel = this.treePanel = new TreePanel(this);
    this.panels = {};
    this.loaded = {}; // {path: uuid}

    socket.on('connect', function onSocketConnect() {
        console.log('Fs socket connected.');

        self.readPath(conf.cwd, function(err, info) {
            if(err) return alert('read path info error:\n', err);

            treePanel.insert(info, treePanel.rootTree);
            self.load(info.p, info.t, info.n);
            self.bind();
        });
    });

    socket.on('error', function(err) {
        alert('socket connect error!');
        console.error(err);
    });
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

_proto.findPathById = function(uuid) {
    var loaded = this.loaded;
    var paths = Object.keys(loaded);
    var i = 0;
    var len = paths.length;

    for(i < 0; i < len; i++) {
        if(loaded[paths[i]] === uuid) return paths[i];
    }

    return '';
};

_proto.readPath = function(path, callback) {
    this.socket.emit('read-path', helper.trim(path), callback);
};

_proto.load = function(path, type, name) {
    path = helper.winPathFix(path);

    var self = this;
    var uuid = this.loaded[path];
    var evt = 'read-' + (0 === type ? 'dir' : 'file');
    var options;

    name = name || function() {
        return 'unknown';
    }();

    if(uuid) {
        this.select(uuid);
    } else {
        this.socket.emit(evt, path, function(err, data) {
            if(err) return alert('load path ' + path + ' error:\n', err);

            uuid = helper.uuid(6);
            options = {
                uuid: uuid,
                path: path,
                name: name,
                type: type,
                data: data
            };
            self.loaded[path] = uuid;
            self.createPanel(options);
            self.treePanel.load(options);
            self.select(uuid);
        });
    }
};

// uuid => use to create id
// name => tab title
// type => typeof tab: 0 || 1
// index => where the tabs will be inserted
_proto.createPanel = function(options) {
    var uuid = options.uuid;
    var name = options.name;
    var type = options.type;
    var data = options.data;
    var index = options.index || 0;

    var navId = this.navPrefix + uuid;
    var id = this.contentPrefix + uuid;
    var navStr = '<li id="' + navId + '">\
            <a href="#' + id + '" data-toggle="tab">' + name + '</a>\
            <i class="glyphicon glyphicon-remove close-tab" data-uuid="' + uuid + '" title="close"></i>\
        </li>';
    var contentStr = '<div class="' + (type === 0 ? 'file-list' : 'ace-editor') +
            ' tab-pane" id="' + id + '">\
            <div class="loading">loading...</div>\
        </div>';
    var tabs = this.panelNav.find('> li');
    var prevTab = this.panelNav.find('li:eq(' + (index - 1) + ')');
    var panel;

    if(!index || !prevTab.length) {
        this.panelNav.append(navStr);
    } else {
        $(navStr).insertAfter(prevTab);
    }

    this.panelContent.append(contentStr);

    panel = type === 0 ?
        new FolderPanel(id, data) :
        new EditorPanel(id, data, this.folderPanelSettings);

    this.panels[uuid] = {type: type, panel: panel};
};

_proto.select = function(uuid) {
    // this.panelNav.find('.active').removeClass('active');
    this.treePanel.select(this.findPathById(uuid));
    $('#' + this.navPrefix + uuid).find('> a').trigger('click');
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

_proto.destroy = function(uuid) {
    $('#' + this.navPrefix + uuid).remove();
    $('#' + this.contentPrefix + uuid).remove();

    delete this.panels[uuid];
};
