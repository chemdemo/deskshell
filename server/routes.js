'use strict';

var fs = require('fs');
var path = require('path');
var conf = require('../config');
var ctrl = require('./controller');
var isWin = /\//.test(__dirname);

module.exports = function(app, io) {
    app.get('/', function(req, res, next) {
        var env = process.env.NODE_ENV === 'production' ? 'build' : 'dev';
        var p = path.resolve(__dirname, '../client/' + env + '/index.html');

        fs.createReadStream(p).pipe(res);
    });

    // 拉取后台部分配置
    app.get('/config', function(req, res, next) {
        res.json({
            cwd: conf.cwd || __dirname,
            term: conf.term
        });
    });

    // io.of('/term').authorization('connection', ctrl.user.auth)
    //     .on('connection', ctrl.socket.termSessionHandle);

    // io.of('/fs').authorization('connection', ctrl.user.auth);
    //     .on('connection', ctrl.socket.fsSessionHandle);

    !isWin && io.of('/term').on('connection', ctrl.socket.termSessionHandle);
    io.of('/fs').on('connection', ctrl.socket.fsSessionHandle);
};
