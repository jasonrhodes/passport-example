const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// set up passport strategies
passport.use('sign-up', new LocalStrategy(function (username, password, done) {
  if (username === 'bad') {
    done(null, false);
    return;
  }

  done(null, { username: username });
}));

passport.use('login', new LocalStrategy(function (username, password, done) {
  if (username === 'bad') {
    done(null, false);
    return;
  }

  done(null, { username: username });
}));

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
app.use(passport.initialize());

// Use passport.authenticate as express middleware, will auto return 401 for failures
app.post('/register', passport.authenticate('sign-up'), function (req, res) {
  res.status(200).send('yay');
});

app.post('/login', passport.authenticate('login'), function (req, res) {
  res.status(200).send('yay');
});

app.listen(process.env.PORT || 4000);
