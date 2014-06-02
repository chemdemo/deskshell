/*
 * Description: Webconsole built with Node.js
 * Author: dmyang <yangdemo@gmail.com>
 */

'use strict';

var debug = require('debug')('app');
var express = require('express');
var http = require('http');
var path = require('path');

var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var session = require('express-session');
// var memoryStore = session.MemoryStore;
var io = require('socket.io');
var term = require('term.js');

var conf = require('./config');
var routes = require('./server/routes');
var user = require('./server/controller').user;
var devStatic = path.resolve(__dirname, 'client/dev');
var distStatic = path.resolve(__dirname, 'client/dist');

var app = express();
var env = app.get('env');
// var sessionStore = new memoryStore();

var server = http.Server(app);
var socket = io.listen(server, {log: 'development' === env});

app.set('env', env);
app.set('port', conf.port || 8090);
app.set('host', conf.host || '127.0.0.1');
// app.set('views', path.join(__dirname, 'server/views'));
// app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser(conf.cookieSecret));
// app.use(session({
//     secret: conf.cookieSecret,
//     cookie: {httpOnly: true, secure: true},
//     store: sessionStore
// }));

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

socket.configure('procuction', function() {
    socket.enable('browser client etag');
    socket.set('log level', 1);

    socket.set('transports', [
        'websocket'
        , 'flashsocket'
        , 'htmlfile'
        , 'xhr-polling'
        , 'jsonp-polling'
    ]);

    // socket.set('authorization', user.wsAuth);
});

socket.configure('development', function() {
    socket.set('transports', ['websocket']);
});

routes(app, socket);

function start() {
    server.listen(app.get('port'), app.get('host'), function() {
        debug('Express server listening on port ' + server.address().port);
    });
};

if(!module.parent) start();
else exports.start = start;
