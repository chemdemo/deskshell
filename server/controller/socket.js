'use strict';

var fs = require('fs');
var user = require('./user');
var conf = require('../../config');
var helper = require('../helper');
var logger = helper.logger;
var FsSession = require('./FsSession');

var users = conf.users;

// var sessions = exports.sessions = {};
exports.termSessionHandle = function(socket) {
    var TermSession = require('./TermSession');
    var session = new TermSession(socket);

    socket.on('message', session.msgHandle.bind(session));
    socket.on('create', session.createHandle.bind(session));
    socket.on('data', session.dataHandle.bind(session));
    socket.on('kill', session.killHandle.bind(session));
    socket.on('resize', session.resizeHandle.bind(session));
    // socket.on('process', session.processHandle);
    socket.on('disconnect', session.disconnectHandle.bind(session));
    socket.on('request-paste', session.pasteHandle.bind(session));
};

exports.fsSessionHandle = function(socket) {
    var session = FsSession(socket);

    socket.on('message', session.msgHandle.bind(session));
    socket.on('lstat', session.lstat.bind(session));
    socket.on('read-path', session.readPath.bind(session));
    socket.on('mv-path', session.mvPath.bind(session));
    socket.on('rm-path', session.rmPath.bind(session));
    socket.on('create-folder', session.createFolder.bind(session));
    socket.on('create-file', session.createFile.bind(session));
    socket.on('write-file', session.writeFile.bind(session));
};
