/*
 * Description: Webconsole built with Node.js
 * Author: dmyang <yangdemo@gmail.com>
 */

'use strict';

var express = require('express');
var http = require('http');
var path = require('path');

var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sio = require('socket.io');
var term = require('term.js');

var conf = require('./config');
var routes = require('./server/routes');
var user = require('./server/controller').user;
var devStatic = path.resolve(__dirname, 'client/dev');
var distStatic = path.resolve(__dirname, 'client/dist');

var app = express();
var env = app.get('env');
var server = http.Server(app);
var io = sio.listen(server);

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(cookieParser(conf.cookieSecret));
// removed at v4.x

if(env == 'development') {
    app.use(express.static(devStatic));
}

if(env == 'production') {
    app.use(express.static(distStatic, {maxAge: conf.maxAge}));
}

app.use(express.static(path.resolve(__dirname, 'client/shared')));

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
// app.use(user.httpAuth);
app.use(term.middleware());

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
    else res.send(env == 'development' ? err.stack : 'Server error!');
});

server.listen(conf.port || 8090, conf.host || 'localhost');

module.exports = app;
