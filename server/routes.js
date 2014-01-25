'use strict';

var fs = require('fs');
var config = require('../../config');
var ctrl = require('../controller');

module.exports = function(app, io) {
    app.get('/', /*ctrl.auth, */function(req, res, next) {
        var env = process.env.NODE_ENV === 'production' ? 'build' : 'dev';
        var p = path.resolve(__dirname, '../client/' + env + '/index.html');

        fs.createReadStream(p).pipe(res);
    });

    io.of('/term').on('connection', ctrl.socket.termHandle);
    io.of('/fs').on('connection', ctrl.socket.fsHandle);
};
