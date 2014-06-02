/*
 * PathTree.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

var helper = require('../helper');
var jst = require('../tmpl')['JST'];
var _proto = TreePanel.prototype;

function TreePanel(panelMgr) {
    if(!(this instanceof TreePanel)) return new TreePanel(panelMgr);

    this.panelMgr = panelMgr;
    this.socket = panelMgr.socket;
    this.pathVal = $('#path-val');
    this.rootTree = $('#path-tree');
    this.pathPrefix = '#path-tree-';

    this.bind();
};

_proto.bind = function() {
    var self = this;
    var panelMgr = this.panelMgr;

    this.rootTree.on('click', 'a', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var $this = $(this);
        var $data = $this.data();
        var type = $data.type;
        var path = $data.path;
        var name = $this.attr('title');
        var isActive = $this.hasClass('active');
        var $li;

        if(type === 0) {
            var $arrow = $this.find('i.fa');

            if($arrow.hasClass('fa-caret-right')) {
                $arrow.removeClass('fa-caret-right').addClass('fa-caret-down');
            } else {
                $arrow.removeClass('fa-caret-down').addClass('fa-caret-right');
            }

            $this.parent().find('ul').slideToggle('fast');
        }

        return panelMgr.load(path, type, name);
    });

    // this.rootTree.on('click', 'i.fa', function(e) {
    //     var cls = this.classList;
    //     var $ul = $(this).parent().parent().find('ul');

    //     if($ul.length) e.stopPropagation();

    //     if(cls.contains('fa-caret-right')) {
    //         cls.remove('fa-caret-right');
    //         cls.add('fa-caret-down');
    //     } else {
    //         cls.remove('fa-caret-down');
    //         cls.add('fa-caret-right');
    //     }

    //     $ul.slideToggle('fast');
    // });
};

_proto.load = function(options) {
    var uuid = options.uuid;
    var type = options.type;
    var path = options.path;
    var name = options.name;
    var data = options.data;
    var $el = this.rootTree.find('a[data-path=\'' + path + '\']');

    if(!$el.length) {
        return alert('sdsffs');
    } else {
        if(type === 0) {
            this.insert(data, $el.parent());
        }
    }

    // this.select(uuid);
};

_proto.insert = function(list, parentNode) {
    var s = '<ul>';

    s += jst['pathTree']({list: $.isArray(list) ? list : [list]});
    s += '</ul>';

    // parentNode.html(s);
    parentNode.append(s);
};

// redirect to some path
_proto.redirect = function(path) {
    ;
};

_proto.select = function(path) {
    // var path = this.panelMgr.findPathById(uuid);
    var rootTree = this.rootTree;
    var $el = rootTree.find('a[data-path=\"' + path + '\"]');

    if(path && $el.length) {
        rootTree.find('.active').removeClass('active');
        $el.addClass('active');
        // $el[0].scrollIntoView();
    } else {
        console.error('can not find path in root tree.');
    }
};

module.exports = TreePanel;
