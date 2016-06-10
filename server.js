var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var gateway = function(req, res, next) {
    var request = {
        protocol : req.protocol,
        method : req.method,
        url : req.url
    };
    io.sockets.emit('request', JSON.stringify(request));
    next();
};

app.use(gateway);

app.get('/', function (req, res) {
  res.send('hello, world!');
});

app.get('/other', function (req, res) {
  res.send('hello, other');
});

io.on('connection', function() {
    console.log('a client connected');
});

server.listen(8081);