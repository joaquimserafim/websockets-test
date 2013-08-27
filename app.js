
var Hapi = require('hapi');
var socketIo = require('socket.io');

// server
var server = Hapi.createServer(8080);

// route
server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: './public', listing: false, index: true }
    }
});

// start server and socket.io
server.start(function start() {
  console.log('server start at '.concat(server.info.uri));
  var io = socketIo.listen(server.listener);

  io.sockets.on('connection', function connection(socket) {
    socket.on('disconnect', function disconnect() {
      io.sockets.emit('user disconnected');
    });
    
    socket.emit('start', {msg: 'socket on'});

    socket.on('msg', function(data) {
      io.sockets.emit('newMsg', data);
    });
  });
});