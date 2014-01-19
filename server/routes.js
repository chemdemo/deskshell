'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(app) {
    app.get('/', function(req, res, next) {
        var env = process.env.NODE_ENV === 'production' ? 'build' : 'dev';
        var p = path.resolve(__dirname, '../client/' + env + '/index.html');
        console.log(p);

        fs.createReadStream(p).pipe(res);
    });
};
