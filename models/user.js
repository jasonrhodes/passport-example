const fakeDb = {};
const User = {};

module.exports = User;

User.create = function (user, callback) {
  if (fakeDb[user.username]) {
    callback(new Error('Username already exists'));
    return;
  }

  fakeDb[user.username] = user;
  callback(null, user);
};

User.get = function (username, callback) {
  const user = fakeDb[username];
  if (!user) {
    callback(new Error('User does not exist'));
    return;
  }

  callback(null, user);
};

User.authenticate = function (username, password, callback) {
  User.get(username, function (err, user) {
    if (err || user.password !== password) {
      callback(new Error('Invalid username or password'));
      return;
    }

    callback(null, user);
  });
};
