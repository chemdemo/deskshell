'use strict';

var fs = require('fs');
var path = require('path');
var config = require('../config');
var ctrl = require('./controller');

module.exports = function(app, io) {
    app.get('/', function(req, res, next) {
        var env = process.env.NODE_ENV === 'production' ? 'build' : 'dev';
        var p = path.resolve(__dirname, '../client/' + env + '/index.html');

        fs.createReadStream(p).pipe(res);
    });

    // io.of('/term').authorization('connection', ctrl.user.auth)
    //     .on('connection', ctrl.socket.handleTermConnection);

    // io.of('/fs').authorization('connection', ctrl.user.auth);
    //     .on('connection', ctrl.socket.handleFsConnection);

    io.of('/term').on('connection', ctrl.socket.handleTermConnection);
    io.of('/fs').on('connection', ctrl.socket.handleFsConnection);
};
