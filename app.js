/**
 * Created by quang on 03/07/2017.
 */
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const nunjucks = require('nunjucks');
const session = require('express-session');
const cookieSession = require('cookie-session');
const shortid = require('shortid');
const cookieParser = require('cookie-parser');
const { db, } = require('./pgp');
const flash = require('express-flash');
const passport = require('passport')
const autho = require('./services/auth')
//const csrf = require('csurf')


//const csrfProtection = csrf({ cookie: true })
app.engine('html', nunjucks.render);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'html');
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(flash());
//app.use(csrfProtection)
app.use(session({
    secret: 'carts',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
    resave: false,
    saveUninitialized: true
}))

require('./services/signup_local.js');
app.use(passport.initialize());
app.use(passport.session());
nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    express: app,
    watch: true
});
app.use(autho.restrict)

app.use(express.static(__dirname + '/public'));
app.use('/',require('./controllers/router'));

require('./model/routes')
require('./services/signup_local')(app,express)
require('./services/initialization')(passport)
require('./services/passport_facebook')(passport)
require('./services/passport_google')(passport)
app.listen(process.env.PORT || 2222,() => {
    console.log('listen port 2222')
});
