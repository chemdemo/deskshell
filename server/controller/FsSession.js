'use strict';

var util = require('util');
var Session = require('./Session');

var FsSession = module.exports = function(socket) {
    if(!(this instanceof FsSession)) return new FsSession(socket);
};

var _proto = FsSession.prototype;

// util.inherit(_proto, Session.prototype);
_proto.__proto__ = Session.prototype;
