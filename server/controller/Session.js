'use strict';

var conf = require('../../config');
var users = conf.users;
var helper = require('../helper');
var logger = helper.logger;
// var sessions = require('./sessions');

var Session = module.exports = function(socket) {
    if(!(this instanceof Session)) return new Session(socket);

    this.req = socket.handshake;
    this.socket = socket;
    this.user = socket.handshake.user;
};

var _proto = Session.prototype;

Session.sessions = {};

_proto.msgHandle = function(msg) {
    logger.log(msg);
};

_proto.setTimeout = function(time, fn) {
    this.clearTimeout();

    this.timer = setTimeout(fn.bind(this), time);
};

_proto.clearTimeout = function() {
    if(!this.timer) return;
    clearTimeout(this.timer);
    this.timer = null;
};
