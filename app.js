const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// set up passport strategy for login
passport.use('login', new LocalStrategy(function (username, password, done) {
  if (username === 'ew' || password === 'bad') {
    done(null, false);
    return;
  }

  done(null, { username: username });
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

app.post('/register', function (req, res) {
  res.status(200).send('yay');
});

// Use passport.authenticate as express middleware, will auto return 401 for failures
app.post('/login', passport.authenticate('login'), function (req, res) {
  res.status(200).send('yay');
});

app.listen(process.env.PORT || 4000);
