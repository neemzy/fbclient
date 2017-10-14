const promisify = require('./promisify');

const users = {};

/**
 * @param {Object}   context
 * @param {String[]} ids
 *
 * @return {Promise}
 */
module.exports = function getUsers(context, ids) {
    const missing = ids.filter(id => !(id in Object.keys(users)));

    return promisify(callback => context.getUserInfo(missing, callback))
        .then(newUsers => {
            Object.assign(users, newUsers); // add previously unknown users to cache

            return ids.map(id => users[id]);
        });
};
