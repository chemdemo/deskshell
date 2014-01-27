'use strict';

var fs = require('fs');
var user = require('./user');
var conf = require('../../config');
var helper = require('../helper');
var logger = helper.logger;
var TermSession = require('./TermSession');
var FsSession = require('./FsSession');

var users = conf.users;

var sessions = exports.sessions = {};

exports.handleTermConnection = function(socket) {
    var session = TermSession(socket);

    socket.on('message', session.msgHandle);
    socket.on('create', session.createHandle);
    socket.on('data', session.dataHandle);
    socket.on('kill', session.killHandle);
    socket.on('resize', session.resizeHandle);
    // socket.on('process', session.processHandle);
    socket.on('disconnect', session.disconnectHandle);
    socket.on('request-paste', session.pasteHandle);
};

exports.handleFsConnection = function(socket) {
    var session = FsSession(socket);

    socket.on('message', session.msgHandle);
    socket.on('read-path', session.readpathHandle);
    socket.on('move-path', session.movepathHandle);
    socket.on('rm-path', session.rmpathHandle);
    socket.on('create-path', session.createpathHandle);
    socket.on('write-path', session.writepathHandle);
};
