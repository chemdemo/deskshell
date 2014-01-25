'use strict';

var fs = require('fs');
var pty = require('pty.js');
var users = require('./user');
var conf = require('../../config');

function handleMsg(msg) {
    console.log(msg);
};

var termSessions = function() {
    var terms = {}; // user: [tid1, tid2...]

    return {
        handleCreate: function(cols, rows, callback) {
            ;
        },
        handleData: function() {
            ;
        },
        handleKill: function() {
            ;
        },
        handleResize: function() {
            ;
        },
        handleProcess: function() {
            ;
        },
        handleDisconnect: function() {
            ;
        },
        handlePaste: function() {
            ;
        }
    }
}();

var fsSessions = {
    ;
};

module.exports = {
    termHandle: function(socket) {
        socket.on('message', handleMsg.bind(socket));

        socket.on('create', termSessions.handleCreate);
        socket.on('data', termSessions.handleData);
        socket.on('kill', termSessions.handleKill);
        socket.on('resize', termSessions.handleResize);
        socket.on('process', termSessions.handleProcess);
        socket.on('disconnect', termSessions.handleDisconnect);
        socket.on('request paste', termSessions.handlePaste);
    },
    fsHandle: function(socket) {
        socket.on('message', handleMsg.bind(socket));
    }
};
