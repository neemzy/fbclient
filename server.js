const fb = require('facebook-chat-api');
const io = require('socket.io')();

const enrichMessages = require('./api/enrichMessages');
const enrichThreads = require('./api/enrichThreads');
const getUsers = require('./api/getUsers');
const handleError = require('./api/handleError');
const promisify = require('./api/promisify');

promisify(callback => fb(require('./credentials'), callback))
    .then(api => {
        api.setOptions({ selfListen: true }); // debug

        promisify(callback => api.getThreadList(0, 16, 'inbox', callback))
            .then(threads => enrichThreads(api, threads))
            .then(threads => {
                io.on('connection', socket => {
                    socket.emit('threads', threads);

                    promisify(callback => api.listen(callback))
                        .then(message => enrichMessages(api, [message]))
                        .then(messages => socket.emit('message', messages.pop()));
                });

                io.listen(3001);
            });

    });
