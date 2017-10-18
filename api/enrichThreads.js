const enrichMessages = require('./enrichMessages');
const getUsers = require('./getUsers');
const promisify = require('./promisify');

/**
 * @param {Object} context
 * @param {Object} thread
 *
 * @return {Promise}
 */
function enrichThread(context, thread) {
    let namePromise;

    if (thread.name.length > 0) {
        namePromise = promisify(thread.name);
    } else {
        const selfID = context.getCurrentUserID();

        const ids = thread.participants.length > 1
            ? thread.participants.filter(id => id !== selfID)
            : [selfID];

        namePromise = getUsers(context, ids).then(users => {
            return users.map(user => user.name).join(', ');
        });
    }

    const historyPromise = promisify(callback => context.getThreadHistory(thread.threadID, 16, undefined, callback))
        .then(history => enrichMessages(context, history)),

        snippetSenderPromise = getUsers(context, [thread.snippetSender]).then(users => {
            return users.pop().name;
        });

    return Promise.all([
        namePromise,
        historyPromise,
        snippetSenderPromise
    ]).then(([name, history, snippetSender]) => {
        return Object.assign(thread, { name, history, snippetSender });
    });
}

/**
 * @param {Object}   context
 * @param {Object[]} threads
 *
 * @return {Promise}
 */
module.exports = function enrichThreads(context, threads) {
    return Promise.all(threads.map(thread => enrichThread(context, thread)));
};
