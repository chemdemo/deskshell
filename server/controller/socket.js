'use strict';

var fs = require('fs');
var pty = require('pty.js');
var user = require('./user');
var conf = require('../../config');
var helper = require('../helper');
var logger = helper.logger;

var users = conf.users;

var sessions = exports.sessions = {};

exports.handleTermConnection = function(socket) {
    socket.on('message', handleMsg.bind(socket));

    socket.on('create', termSessions.handleCreate.bind(socket));
    socket.on('data', termSessions.handleData.bind(socket));
    socket.on('kill', termSessions.handleKill.bind(socket));
    socket.on('resize', termSessions.handleResize.bind(socket));
    socket.on('process', termSessions.handleProcess.bind(socket));
    socket.on('disconnect', termSessions.handleDisconnect.bind(socket));
    socket.on('request-paste', termSessions.handlePaste.bind(socket));
};

exports.handleFsConnection = function(socket) {
    socket.on('message', handleMsg.bind(socket));
};

var termSessions = function() {
    return {
        handleCreate: function(cols, rows, callback) {
            var socket = this;
            var user = socket.handshake.user;
            var userTerms = users[user] ? users[user] : users[user] = [];

            if(userTerms.length > conf.limitPerUser) {
                logger.warn('Terminal limited.');
                // return callback(new Error('Terminal limited.'));
                return socket.emit('term-create', {err: new Error('Terminal limited.')});
            }

            var term = pty.fork(conf.shell, shellArgs, {
                name: conf.term.termName,
                cols: cols,
                rows: rows,
                cwd: conf.cwd || process.env.HOME
            });
            var id = term.pty;

            term.on('data', function(data) {
                socket.emit('data', id, data);
            });

            term.on('close', function() {
                socket.emit('kill', id);
                delete terms[id];
                logger.log('Closed pty (%s): %d.', term.pty, term.fd);
            });

            userTerms.push(id);
            terms[id] = term;

            socket.emit('term-create', {err: null, id: id, pty: term.pty});
        },
        handleData: function(id, data) {
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
