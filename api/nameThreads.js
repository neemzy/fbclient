const getUsers = require('./getUsers');
const promisify = require('./promisify');

/**
 * @param {Object} context
 * @param {Object} thread
 *
 * @return {Promise}
 */
function nameThread(context, thread) {
    if (thread.name.length > 0) {
        return promisify(thread);
    }

    let selfId = context.getCurrentUserID(),

        ids = thread.participants.length > 1
            ? thread.participants.filter(id => id !== selfId)
            : [selfId];

    return getUsers(context, ids)
        .then(users => {
            thread.name = users.map(user => user.name).join(', ');

            return thread;
        });
}

/**
 * @param {Object}   context
 * @param {Object[]} threads
 *
 * @return {Promise}
 */
module.exports = function nameThreads(context, threads) {
    return Promise.all(threads.map(thread => nameThread(context, thread)));
};
