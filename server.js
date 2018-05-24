var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var io = require('socket.io')(server);
  var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8000
  var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
  app.get('/', function(req, res, next) {
  	res.sendFile(__dirname + '/public/index.html')
  });

  app.use(express.static('public'));


  io.on('connection', function(client) {
  	console.log('Client connected...');

  	client.on('join', function(data) {
  		console.log(data);
  	});
client.on('messages', function(data){
  		client.emit('thread', data);
  		client.broadcast.emit('thread', data);
  	});
  });

server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

  //server.listen(7777);
