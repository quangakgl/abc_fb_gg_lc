const bcrypt = require('bcryptjs');
const {db, config} = require('../pgp');
const User = require('../model/users')
module.exports = function (app, express) {
    app.post('/signup', (req, res) => {
        if (req.body.password !== req.body.password2) {
            req.flash('error', 'Mật khẩu không trùng nhau');
            res.status(401).render('index');
        } else {
            User.findname(req.body.username)
                .then(data => {
                    if (data.length === 0) {
                        User.create(req.body)
                            .then(user => {
                                //console.log(user)
                                req.flash('success', 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ!')
                                res.redirect('/')
                            })
                            .catch(error => {
                                console.log(error.message);
                            });
                    } else {
                        // this username already exists
                        req.flash('error', 'Tài khoản đã tồn tại. Vui lòng đăng nhập hoặc đăng ký một tài khoản khác!')
                        res.redirect('/')
                    }
                })
                .catch(error => {
                    console.log(error.message);
                });
        }

    });
    app.post('/login', (req, res) => {
        User
            .findUsername(req.body.username)
            .then(data => {
                if (data === null) {
                    req.flash('error', 'Đăng nhập không thành công. Tài khoản không tồn tại!!!')
                    res.redirect('/');
                } else {
                    bcrypt.compare(req.body.password, data.password, function (err, hashRes) {
                        if (hashRes) {
                            req.session['username'] = req.body.username;
                            req.flash('success', 'Bạn đăng nhập thành công!')
                            res.redirect('/');
                        } else {
                            req.flash('error', 'Đăng nhập không thành công. Tài khoản không khớp !!!');
                            res.redirect('/')
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    });
}
