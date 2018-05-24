
var socket = io.connect('http://chatapp-maduchat.7e14.starter-us-west-2.openshiftapps.com:8080',{'forceNew':true });
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
