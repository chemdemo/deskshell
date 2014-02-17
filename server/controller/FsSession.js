'use strict';

var util = require('util');
var cp = require('child_process');
var fs = require('fs');
var path = require('path');
var Session = require('./Session');
var conf = require('../../config');
var helper = require('../helper');
var logger = helper.logger;

var FsSession = module.exports = function(socket) {
    if(!(this instanceof FsSession)) return new FsSession(socket);

    Session.call(this, socket);
};

util.inherit(FsSession, Session);

var _proto = FsSession.prototype;

_proto.readpathHandle = function(p, callback) {
    fs.stat(p, function(err, stats) {
        if(err) return callback(err);

        if(stats.isDirectory()) {
            fs.readdir(p, callback);
        } else {
            ;
        }
    });
};
