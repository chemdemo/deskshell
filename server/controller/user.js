'use strict';

var conf = require('../../config');

var users = exports.passed = {};

exports.auth = function(req, res, next) {
    var name = req.params.name || req.query.name || '';
    var pass = req.params.pass || req.query.pass || '';

    if(!name || !pass) return next('Authorization failed.');

    if(!Object.hasOwnProperty.call(conf, name)) return next('Has no permission to access.');

    if(conf.name !== pass) return next('Authorization failed.');

    if(!users.name) users[name] = {pass: pass, terms: {}};

    next();
};
