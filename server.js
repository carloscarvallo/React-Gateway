'use strict';

const express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io')(server),
      router = express.Router();

const gateway = function(req, res, next) {
    let request = {
        ip: req.ip,
        result: res.statusCode,
        protocol: req.protocol,
        method: req.method,
        host: req.hostname,
        url: req.url
    };
    io.sockets.emit('request', JSON.stringify(request));
    next();
};

router.use(gateway);

router.get('/', function (req, res) {
    res.send('hello, world!');
});

router.get('/other', function (req, res) {
    res.send('hello, other');
});

app.use(router);

io.on('connection', function() {
    console.log('...a client connected');
});

server.listen(8081);