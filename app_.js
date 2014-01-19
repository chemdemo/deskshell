var app = require('http').createServer(handle);
var io = require('socket.io').listen(app);
var fs = require('fs');
var path = require('path');

app.listen(8888);

function handle(req, res) {
    if(req.url.match(/\//)) {
        fs.createReadStream(path.join(__dirname, 'client/dev/index.html')).pipe(res);
    } else {
        res.writeHead(404);
        res.end('Page not found.');
    }
}

io.sockets.on('connection', function(socket) {
    socket.send(fs.readdirSync(__dirname).toString());

    socket.on('message', function(data) {
        console.log(data);
    });
});
