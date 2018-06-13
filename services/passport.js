const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//pull schema out of mongoose
const User = mongoose.model('users');

//take user model, generate token to be stuffed into cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        //returns promise
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            //already have record with given profile ID
            done(null, existingUser);            
        } else {
            //no user record with this ID, make new record
            const user = await new User({ googleId: profile.id }).save()
                //returns new model instance of the instance we just created
                done(null, user);
            }
        //creates new instance of a user
    }
)
);