
var Hapi = require('hapi');

var socketIo = require('socket.io');


var server = Hapi.createServer(8080);


server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: './public', listing: false, index: true }
    }
});





server.start(function start() {
  console.log('server start at '.concat(server.info.uri));
  var io = socketIo.listen(server.listener);

  io.sockets.on('connection', function conncetion(socket) {
    socket.emit('start', {msg: 'socket on'});
  });
});