const handleError = require('./handleError');

/**
 * @param {*} item
 *
 * @return {Promise}
 */
module.exports = function promisify(item) {
    return new Promise((resolve, reject) => {
        if (typeof item !== 'function') {
            resolve(item);
        }

        item((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
    .catch(handleError);
};
