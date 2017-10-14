const fb = require('facebook-chat-api');

const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const getUsers = require('./src/getUsers');
const handleError = require('./src/handleError');
const nameThreads = require('./src/nameThreads');
const promisify = require('./src/promisify');

const credentials = require('./credentials');

// Facebook API client
fb(credentials, (err, api) => {
    if (err) {
        return handleError(err);
    }

    api.setOptions({ selfListen: true }); // debug

    promisify(callback => api.getThreadList(0, 16, 'inbox', callback))
        .then(threads => nameThreads(api, threads))
        .then(threads => {
            io.on('connection', socket => socket.emit('threads', threads));
            api.listen((err, message) => {
                getUsers(api, [message.senderID]).then(users => {
                    const user = users.pop();

                    console.log({ user, message });
                });
            });
        });
});

// Express & Socket.IO
app.use(express.static('public'));
server.listen(3000);
