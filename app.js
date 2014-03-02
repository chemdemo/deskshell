/*
 * Description: Webconsole built with Node.js
 * Author: dmyang <yangdemo@gmail.com>
 */

'use strict';

var express = require('express');
var sio = require('socket.io');
var http = require('http');
var path = require('path');
var term = require('term.js');

var conf = require('./config');
var routes = require('./server/routes');
var user = require('./server/controller').user;

var app = express();
var server = http.Server(app);
var io = sio.listen(server);

app.use(function(req, res, next) {
    if(req.url.match(/term|fs/)) {
        var setHeader = res.setHeader;

        res.setHeader = function(name) {
            switch (name) {
                case 'Cache-Control':
                case 'Last-Modified':
                case 'ETag':
                return;
            }
            return setHeader.apply(res, arguments);
        };
    }

    next();
});

app.use(user.auth);

app.use(term.middleware());

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
// app.use(express.cookieParser(conf.cookieSecret));
app.use(app.router);

app.configure('development', function() {
    app.use(express.static(path.resolve(__dirname, 'client/dev')));
});

app.configure('production', function() {
    var p = path.resolve(__dirname, 'client/build');
    app.use(express.static(p, {maxAge: conf.maxAge}));
});

app.use(express.static(path.resolve(__dirname, 'client/shared')));

io.configure('procuction', function() {
    io.enable('browser client etag');
    io.set('log level', 1);

    io.set('transports', [
        'websocket'
        , 'flashsocket'
        , 'htmlfile'
        , 'xhr-polling'
        , 'jsonp-polling'
    ]);

    io.set('authorization', user.wsAuth);
});

io.configure('development', function() {
    io.set('transports', ['websocket']);
});

routes(app, io);

// 404 || 50x
app.use(function(err, req, res, next) {
    if(err.status === 404) res.send('Page not found!');
    else res.send('Server error!');
});

server.listen(conf.port || 8090, conf.host || 'localhost');
