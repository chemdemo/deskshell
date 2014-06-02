'use strict';

var fs = require('fs');
var path = require('path');
var conf = require('../config');
var ctrl = require('./controller');
var isWin = process.platform.match(/win32/);

module.exports = function(app, io) {
    app.get('/', handleHome(app));

    // 拉取后台部分配置
    app.get('/config', handleConf(app));

    // 404 || 50x
    app.use(handleErr(app));

    // io.of('/term').authorization('connection', ctrl.user.auth)
    //     .on('connection', ctrl.socket.termSessionHandle);

    // io.of('/fs').authorization('connection', ctrl.user.auth);
    //     .on('connection', ctrl.socket.fsSessionHandle);

    !isWin && io.of('/term').on('connection', ctrl.socket.termSessionHandle);
    io.of('/fs').on('connection', ctrl.socket.fsSessionHandle);
};

function handleHome(app) {
    return function(req, res, next) {
        var dir = app.get('env') === 'production' ? 'dist' : 'dev';
        var p = path.resolve(__dirname, '../client/' + dir + '/index.html');

        fs.createReadStream(p).pipe(res);
    };
};

function handleConf(app) {
    return function(req, res, next) {
        res.json({
            cwd: conf.cwd || __dirname,
            term: conf.term
        });
    };
};

function handleErr(app) {
    return function(err, req, res, next) {
        if(err.status === 404) res.send('Page not found!');
        else res.send(env == 'development' ? err.stack : 'Server error!');
    }
};
