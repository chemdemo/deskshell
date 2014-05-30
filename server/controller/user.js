'use strict';

var basicAuth = require('basic-auth');
var conf = require('../../config');
var helper = require('../helper');
var logger = helper.logger;

var users = conf.users;
var hashed = exports.hashed = {};
var called;
var check = function(user, pass) {
    var name = helper.sha1(user);
    var passwd = helper.sha1(pass);
    var keys = Object.keys(users);

    if(!keys.length) {
        logger.warn('It\'s dangerous while anyone can access with no authorization.');

        return function(req, res, next) {
            next();
        };
    }

    if(!called) {
        called = true;

        keys.forEach(function(k) {
            var name = helper.hashed(k) ? k : helper.sha1(k);
            var pass = helper.hashed(users[k]) ? users[k] : helper.sha1(users[k]);

            hashed[name] = pass;
        });
    }

    if(!Object.hasOwnProperty.call(hashed, name)) return Error('Has no permission to access.');
    if(passwd !== hashed[name]) return Error('Authorization failed.');

    return null;
};

exports.httpAuth = function(req, res, next) {
    if(!Object.keys(users).length) {
        logger.warn('It\'s dangerous while anyone can access with no authorization.');

        return function(req, res, next) {
            next();
        };
    }

    var user = basicAuth(req);

    if(!user) return next(Error('Both username and password were required.'));

    next(check(user.name, user.pass));
};

// handshakeData => socket request object
// see => https://github.com/visionmedia/node-basic-auth/blob/master/index.js
exports.wsAuth = function(handshakeData, next) {
    var auth = handshakeData.headers.authorization;

    if(!auth) return next(Error('Both username and password were required.'));

    // malformed
    var parts = auth.split(' ');

    if ('basic' != parts[0].toLowerCase()) return;
    if (!parts[1]) return;
    auth = parts[1];

    // credentials
    auth = new Buffer(auth, 'base64').toString();
    auth = auth.match(/^([^:]+):(.+)$/);
    if (!auth) return next(Error('Both username and password were required.'));

    next(check(auth[1], auth[2]));
};
