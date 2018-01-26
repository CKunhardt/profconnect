var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/views/index.html");
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
	console.log('user disconnected');
    });
    
    socket.on('chat message', function(msg){
	io.emit('chat message', msg);	
    });

    socket.on('drawClick', function(data){
	socket.broadcast.emit('draw', {
	    x: data.x,
	    y: data.y,
	    type: data.type,
	    color: data.color,
	    size: data.size
	});
    });
});

http.listen(4000, function(){
    console.log('listening on *:4000');
});
