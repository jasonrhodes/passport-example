const fakeDb = {};
const User = {};

module.exports = User;

/**
 * Create a single user
 *
 */
User.create = function (user, callback) {
  fakeDb[user.username] = user;
  callback(null, user);
};

/**
 * Find a user by username
 *
 */
User.findByUsername = function (username, callback) {
  const user = fakeDb[username];
  callback(null, user);
};

/**
 * List all users
 *
 */
User.list = function(callback) {
  callback(null, fakeDb);
};
