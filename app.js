const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

// set up passport strategy for login
passport.use('login', new LocalStrategy(function (username, password, done) {
  User.findByUsername(username, function(err, user) {
    if (err) {
      return done(err);
    }

    // if there is no user or the password is wrong, fail as false
    if (!user || user.password !== password) {
      return done(null, false);
    }

    done(null, user);
  });
}));

// These 2 functions seem to be required, even though we're not doing much with sessions here in this example

// tell passport how to store a unique value for the user
passport.serializeUser(function(user, cb) {
  cb(null, user.username);
});

// give passport the user back, based on the unique value you stored in serializeUser
passport.deserializeUser(function(username, cb) {
  cb(null, { username: username });
});

// set up the express app
app.use(bodyParser.json());
app.use(passport.initialize()); // <-- seems to be required, not sure what it does

// custom sign-up express middleware, checks if user exists and returns an error if so
const blockDuplicateSignUps = function(req, res, next) {
  User.findByUsername(req.body.username, function(err, user) {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    if (user) {
      return res.status(409).send({ message: 'Username already exists' })
    }

    next();
  });
};

app.get('/list', function(req, res) {
  User.list(function(err, list) {
    if (err) {
      return res.status(500).send('Something went wrong // ' + err.message);
    }

    res.status(200).send(list);
  });
});

// Use custom middleware since you don't really need to "authenticate" during the sign-up flow
app.post('/register', blockDuplicateSignUps, function(req, res) {
  User.create(req.body, function(err, user) {
    if (err) {
      res.status(500).send('Something went wrong');
      return;
    }
    res.status(200).send(user);
  });
});

// Use passport.authenticate as express middleware, will auto return 401 for failures
app.post('/login', passport.authenticate('login'), function(req, res) {
  res.status(200).send('yay');
});

app.listen(process.env.PORT || 4000);
