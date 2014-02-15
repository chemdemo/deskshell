'use strict';

// see => https://github.com/chjj/tty.js

var util = require('util');
var pty = require('pty.js');
var Session = require('./Session');
var execFile = require('child_process').execFile;
var conf = require('../../config');
var helper = require('../helper');
var logger = helper.logger;

var TermSession = module.exports = function(socket) {
    if(!(this instanceof TermSession)) return new TermSession(socket);

    Session.call(this, socket);
    this.terms = {};
};

util.inherits(TermSession, Session);

var _proto = TermSession.prototype;

_proto.createHandle = function(id, cols, rows, callback) {
    var socket = this.socket;
    var user = socket.handshake.user;
    var terms = this.terms;
    var term;

    if(Object.keys(terms).length >= conf.limitPerUser) {
        logger.warn('Terminal limited.');
        return callback(new Error('Terminal limited.'));
    }

    this.id = id;

    term = pty.fork(conf.shell, conf.shellArgs || [], {
        name: conf.term.termName,
        cols: cols,
        rows: rows,
        cwd: conf.cwd || process.env.HOME
    });

    term.pty = id;

    term.on('data', function(data) {
        socket.emit('data', id, data);
    });

    term.on('close', function() {
        socket.emit('kill', id);
        delete terms[id];
        logger.log('Closed pty (%s): %d.', term.pty, term.fd);
    });

    terms[id] = term;
    if(!Session.sessions[id]) Session.sessions[id] = this;

    logger.log('Created pty (id: %s, master: %d, pid: %d).', id, term.fd, term.pid);

    callback(null, {id: id, pty: term.pty});
};

_proto.dataHandle = function(id, data) {
    var terms = this.terms;

    if(!terms[id]) {
        logger.warn('Terminal is not exisits.');
    } else {
        terms[id].write(data);
    }
};

_proto.killHandle = function(id) {
    var terms = this.terms;
    var term = terms[id];

    if(term) {
        term.destroy();
        delete terms[id];
        logger.log('term [%s] has killed.', id);
    }
};

_proto.resizeHandle = function(id, cols, rows) {
    var terms = this.terms;
    var term = terms[id];

    !!term && term.resize(cols, rows);
};

_proto.disconnectHandle = function() {
    var terms = this.terms;
    var keys = Object.keys(terms);
    var i = keys.length;
    var term;

    while(i--) {
        term = terms[keys[i]];
        term.destroy();
        term = null;
    }

    if(sessions[this.id]) sessions[this.id] = null;

    logger.log('Killed all ptys');
};

_proto.pasteHandle = function(callback) {
    var socket = this.socket;

    function exec(args) {
        var file = args.shift();

        return execFile(file, args, function(err, stdout, stderr) {
            if (err) return callback(err);
            if (stderr && !stdout) return callback(new Error(stderr));
            return callback(null, stdout);
        });
    }

    // X11:
    return exec(['xsel', '-o', '-p'], function(err, text) {
        if (!err) return callback(null, text);

        return exec(['xclip', '-o', '-selection', 'primary'], function(err, text) {
            if (!err) return callback(null, text);
            // Mac:
            return exec(['pbpaste'], function(err, text) {
                if (!err) return callback(null, text);
                // Windows:
                // return exec(['sfk', 'fromclip'], function(err, text) {
                return callback(new Error('Failed to get clipboard contents.'));
            });
        });
    });
};
