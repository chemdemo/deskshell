'use strict';

var user = require('./user');
var conf = require('../../config');
var helper = require('../helper');
var logger = helper.logger;

var Session = module.exports = function(socket) {
    if(!(this instanceof Session)) return new Session(socket);

    this.req = socket.handshake;
    this.socket = socket;
    this.terms = {};
    this.user = socket.handshake.user;
    this.id = this.uid();
};

var _proto = Session.prototype;

Session.uid = 0;

_proto.uid = function() {
    return Session.uid++;
};
