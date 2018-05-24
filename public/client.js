var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
server_ip_address =server_ip_address+":"+server_port;
var socket = io.connect(server_ip_address);
  socket.on('connect', function(data) {
      socket.emit('join', 'Hello server from client');
  });
 // listener for 'thread' event, which updates messages
socket.on('thread', function(data) {
    $('#thread').append('<li>' + data + '</li>');
  });

  // sends message to server, resets & prevents default form action
  $('form').submit(function() {
  	var message = $('#message').val();
  	socket.emit('messages', message);
  	this.reset();
  	return false;
  });
