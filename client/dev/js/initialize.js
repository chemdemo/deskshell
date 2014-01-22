/**
 * main.js
 * Copyright (c) 2013-2014, dmyang (MIT License)
 */

'use strict';

// require('./bind')();
require('./ui');
var tmpl = require('./tmpl');
var data = [
    {
        path: '/data/sites/www.abc.com',
        isDir: true,
        filename: 'www.abc.com'
    },
    {
        path: '/data/sites/www.abc.com/a.zip',
        isDir: false,
        filename: 'a.zip'
    }
];

console.log(tmpl["Tmpl"]["fileList"]({list: data}));
