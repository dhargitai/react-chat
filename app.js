const express = require('express');
const app = express();
const uuid = require('uuid');

app.disable('x-powered-by');
app.use(express.static('client/dist'));

//routes
app.get('*', function(request, response) {
    response.sendfile(__dirname + '/client/dist/index.html');
});

//Listen on port 5000 or somewhere else...
const port = process.env.PORT || 5000;
server = app.listen(port, () => {
    console.log(`Server started and listens on port ${port}...`);
});

//socket.io instantiation
const io = require("socket.io")(server);

let users = [];
let connections = [];

//listen on every connection
io.on('connection', (socket) => {
    connections.push(socket);

    socket.username = `Guest${(users.length + 1).toString().padStart(4, '0')}`;
    let id = uuid.v4();
    socket.id = id;
    users.push({id, username: socket.username});

    console.log('New user connected, username: ', socket.username, socket.id);

    socket.emit('connection_created', {
        username: socket.username,
        connectionId: socket.id,
    });

    //listen on change_username
    socket.on('change_username', data => {
        if (typeof data.username === 'string' && data.username.length) {
            console.log('Changing username to ', data.username, socket.id);
            socket.username = data.username;
        }
    });

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {
            message: data.message,
            username: socket.username,
            time: Date.now(),
            connectionId: socket.id,
        });
    });

    //Disconnect
    socket.on('disconnect', data => {
        console.log('User disconnects...', socket.id);

        if (!socket.username) {
            return;
        }

        //find the user and delete from the users list
        let user = undefined;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === socket.id) {
                user = users[i];
                break;
            }
        }
        users = users.filter( x => x !== user);
        connections.splice(connections.indexOf(socket),1);
    })
});
