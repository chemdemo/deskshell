/*
 * socket.js
 * Copyright (c) 2013-2014, dmyang<yangdemo@gmail.com> (MIT License)
 */

var socket;

exports.connect = function(callback) {
    socket = io.connect('/ws');

    socket.on('connect', callback);
};
