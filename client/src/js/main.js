/**
 * main.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

'use strict';

function init() {
    var ui = require('./ui');
    var PanelManager = require('./cls/PanelManager');
    var TermManager = require('./cls/TermManager');

    $.get('/config', function(conf) {
        // console.log(conf);
        new PanelManager(conf);
    });

    // new TermManager();
};

$(document).ready(init);

module.exports = init;
