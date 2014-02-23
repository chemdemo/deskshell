/**
 * main.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

'use strict';

function init() {
    var ui = require('./ui');
    var tmpl = require('./tmpl')['Tmpl'];
    var mock = require('./mock_data');

    $.get('/config', function(conf) {
        ;
    });
    // var TermManager = require('./TermManager');

    // new TermManager();

    $('#files').html(tmpl['fileList']({list: mock.fileList}));
};

$(document).ready(init);

module.exports = init;
