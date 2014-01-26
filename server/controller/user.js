'use strict';

var express = require('express');
var conf = require('../../config');
var helper = require('../helper');
var logger = helper.logger;

var users = conf.users;
var hashed = exports.hashed = {};

var auth = exports.auth = function() {
    if (!Object.keys(users).length) {
        logger.warn('It\'s dangerous while anyone can access with no authorization.');
        return function(req, res, next) {
            next();
        };
    }

    Object.keys(users).forEach(function(k) {
        var name = helper.hashed(k) ? k : helper.sha1(k);
        var pass = helper.hashed(users[k]) ? users[k] : helper.sha1(users[k]);

        hashed[name] = pass;
    });

    // app.use(express.basicAuth(callback))
    return express.basicAuth(function(user, pass, done) {
        var name = helper.sha1(user);
        var passwd = helper.sha1(pass);

        if (!Object.hasOwnProperty.call(hashed, name)) return done('Has no permission to access.');

        if(passwd !== hashed[name]) return done('Authorization failed.');

        done(null, user);
    });
}();

// hsData(handshakeData) => socket request object
exports.wsAuth = function(hsData, next) {
    hsData.__proto__ = Stream.prototype;
    auth(hsData, null, function(err) {
        hsData.user = hsData.remoteUser || hsData.user;
        next(err);
    });
};
