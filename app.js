/*
 * Description: Webconsole built with Node.js
 * Author: dmyang <yangdemo@gmail.com>
 */

'use strict';

var express = require('express');
var sio = require('socket.io');
var http = require('http');
var path = require('path');

var conf = require('./config');
var routes = require('./server/routes');

var app = express();
var server = http.Server(app);
var io = sio.listen(server);

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
// app.use(express.cookieParser(settings.COOKIE_SECRET));
app.use(app.router);

routes(app);

app.configure('development', function() {
    app.use(express.static(path.resolve(__dirname, 'client/dev')));
});

app.configure('production', function() {
    var p = path.resolve(__dirname, 'client/build');
    app.use(express.static(p, {maxAge: conf.MAXAGE}));
});

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
});

io.configure('development', function() {
    io.set('transports', ['websocket']);
});

io.of('/cmd').on('connection', function(socket) {
    socket.on('message', function(data) {
        console.log(data);
    });
});

server.listen(conf.SYS_PORT, conf.SYS_HOST);
