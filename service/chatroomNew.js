var server = require('../bin/www');

var io = require('socket.io')(server);


io.on('connection', (socket) => {

    socket.on('sign in',(data)=>{
        socket.username = data;
        socket.broadcast.emit('user in',data);
        socket.emit('sign in ok',data);
    });

    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

});