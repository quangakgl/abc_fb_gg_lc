/**
 * Created by quang on 20/07/2017.
 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config/config');
const User = require('../model/users');
module.exports = function(passport) {
    passport.use('google', new GoogleStrategy({
            clientID        : config.googleAuth.clientID,
            clientSecret    : config.googleAuth.clientSecret,
            callbackURL     : config.googleAuth.callbackURL,
    },
        (req,accesstoken, refreshtoken, profile, done) => {
            console.log(profile)
            User
                .findUsername(profile._json.name.givenName)
                .then( user => {
                    if(user === null){
                        let user = {};
                        user['email'] = profile.emails[0].value
                        user['username'] = profile._json.name.givenName;
                        user['accesstoken'] === accesstoken;
                        //console.log('is saved')
                        User.createfb(user)
                            .then(user =>{
                                return done(null,user)
                            })
                    }else {
                        if(user['username'] && user['username'] === profile._json.name.givenName ){
                            return done(null,user)
                        }else {
                            user['username'] = profile._json.name.givenName
                            user['email'] = profile.emails[0].value
                            user['accesstoken'] === accesstoken;
                            User.createfb(user)
                                .then(user =>{
                                    return done(null,user)
                                })
                        }
                    }
                })
    }))
}