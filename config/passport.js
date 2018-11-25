const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/user.model');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email, password, done) => {
    User.findOne({ email })
        .then((user) => {
            if(!user) {
                return done({error: 'User not found'}, false, { info: { 'user': 'not found' } } );
            }
            if(!user.validatePassword(password)) {
                return done({error: 'Invalid email or password' }, false, { info: { 'email or password': 'is invalid' } });
            }

            return done(null, user);

        }).catch(done);
}));