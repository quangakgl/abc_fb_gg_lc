/**
 * Created by quang on 14/07/2017.
 */
const passport = require('passport');
const User = require('../model/users');
module.exports = function (passport){

    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser((userObj, done) => {
        User
            .findUsername(userObj.username || userObj.email)
            .then(user => {
                done(null, userObj);
            })
            .catch(err => {
                console.log('ERROR in deserializeUser:', err);
                done(null, false);
            });
    });
};
