/**
 * Created by quang on 14/07/2017.
 */
const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const config = require('../config/config');
const User = require('../model/users');
module.exports = function (passport) {
    passport.use('facebook', new FacebookStrategy({
        clientID        : config.facebookAuth.clientID,
        clientSecret    : config.facebookAuth.clientSecret,
        callbackURL     : config.facebookAuth.callbackURL,
         profileFields: ['id','email','name']//email gender locate
    },
    (req,accesstoken, refreshtoken, profile, done) => {
        User
            .findUsername(profile.name.familyName || profile._json.email)
            .then( user => {
                if(user === null){
                    let user = {};
                    user['username'] = profile.name.familyName  || profile._json.email;
                    user['accesstoken'] === accesstoken;
                   // console.log('is saved')
                    User.createfb(user)
                        .then(user =>{
                            return done(null,user)
                        })
                }else {
                    if(user['username'] && user['username'] === profile._json.email || profile.name.familyName ){
                        return done(null,user)
                    }else {
                        user['username'] = profile._json.email
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