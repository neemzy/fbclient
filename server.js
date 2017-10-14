const fb = require('facebook-chat-api');
const io = require('socket.io')();

const getUsers = require('./api/getUsers');
const handleError = require('./api/handleError');
const nameThreads = require('./api/nameThreads');
const promisify = require('./api/promisify');

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

            io.listen(3001);
        });
});
