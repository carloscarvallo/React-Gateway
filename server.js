var express = require('express');
var morgan = require('morgan');

var app = express();
var io = require('socket.io')(8081);


app.use(function(req, res, next) {
    
    console.log(req.protocol);
    console.log(req.method);
    console.log(req.url);
    
    var request = {
        protocol : req.protocol,
        method : req.method,
        url : req.url
    };
    io.on('connection', function(socket) {
        socket.emit('request', JSON.stringify(request));
    });
    next();
});

app.get('/', function (req, res) {
  res.send('hello, world!');
});

app.get('/other', function (req, res) {
  res.send('hello, other');
});

app.listen(8080, function () {
  console.log('Example app listening on port %s', 8080);
});