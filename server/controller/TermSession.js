'use strict';

var Session = require('./Session');
var sessions = require('./socket').sessions;

var TermSession = module.exports = function(socket) {
    if(!(this instanceof TermSession)) return new TermSession(socket);

    this.terms = {};
};

var _proto = TermSession.prototype;

_proto.__proto__ = Session.prototype;

_proto.handleCreate = function(cols, rows) {
    var socket = this.socket;
    var user = socket.handshake.user;
    var terms = this.terms;

    if(Object.keys(terms).length >= conf.limitPerUser) {
        logger.warn('Terminal limited.');
        // return callback(new Error('Terminal limited.'));
        return socket.emit('term-create', {err: new Error('Terminal limited.')});
    }

    var term = pty.fork(conf.shell, conf.shellArgs, {
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

    terms[id] = term;

    logger.log('Created pty (id: %d, master: %d, pid: %d).', id, term.fd, term.pid);

    socket.emit('term-create', {err: null, id: id, pty: term.pty});
};

_proto.handleData = function(id, data) {
    var terms = this.terms;

    if(!terms[id]) {
        logger.warn('Terminal is not exisits.');
    } else {
        terms[id].write(data);
    }
};

_proto.handleKill = function(id) {
    var terms = this.terms;

    if(terms[id]) {
        terms[id].destroy();
        delete terms[id];
    }
};

_proto.disconnectHandle = function() {
    var terms = this.terms;
    var keys = Object.keys(terms);
    var i = keys.length;
    var term;

    while(i--) {
        term = terms[keys[i]];
        delete term;
        term.destroy();
    }

    if(sessions[this.id]) delete sessions[this.id];

    logger.log('Killed all ptys');
};
