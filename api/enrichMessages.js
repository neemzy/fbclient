const getUsers = require('./getUsers');
const promisify = require('./promisify');

/**
 * @param {Object} context
 * @param {Object} message
 *
 * @return {Promise}
 */
function enrichMessage(context, message) {
    return getUsers(context, [message.senderID]).then(users => {
        return Object.assign(message, { sender: users.pop() });
    });
}

/**
 * @param {Object}   context
 * @param {Object[]} messages
 *
 * @return {Promise}
 */
module.exports = function enrichMessages(context, messages) {
    return Promise.all(messages.map(message => enrichMessage(context, message)));
};
