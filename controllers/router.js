const User = require('../model/users');
const router = require('express').Router();
const passport = require('passport');
const routess = require('../model/routes');
const auth = require('../services/signup_local');
const auth_fb = require('../services/passport_facebook')
const auth_go = require('../services/passport_google')
router.get('/', routess.index);
router.get('/product-detail/:id?', routess.productdetail);
router.get('/giohang2', routess.giohang1);
router.get('/thanhtoan', routess.thanhtoan);
router.get('/login/facebook', passport.authenticate('facebook'));//,{scope :['email']}
router.get('/login/facebook/callback', passport.authenticate('facebook',{
    failureRedirect: '/',
    successRedirect: '/'
    }
));

router.get('/login/google', passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/userinfo.email'] }));
router.get('/login/google/callback',
    passport.authenticate('google', { failureRedirect: '/giohang2',successRedirect: '/' }));
router.get('/logout', (req, res) => {
    req.session.destroy();
    //delete req.session['username'] && delete req.session.user;
    // delete req.session.user;
    //req.flash('success','Đã đăng xuất')
    res.redirect('/')
});
module.exports = router;