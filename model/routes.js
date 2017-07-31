/**
 * Created by quang on 09̣/07/2017.
 */
const { db, } = require('../pgp');
exports.index = (req,res) =>{
     //console.log(req.session)
    db.any('SELECT * FROM information')
        .then( data =>{
            res.render('index',{
                carts : data,
                username : req.session['username'] || req.session.user
            })
        } )
}
exports.productdetail = (req, res) => {
    let id = req.params.id;
        db.any('SELECT * FROM information WHERE id = ' + id)
            .then(data => {
                res.render('product-detail', {
                    carts: data,
                    username : req.session['username'] || req.session.user
                })
            })
}
exports.giohang1 = (req,res) =>{
    db.any('SELECT * FROM information')
        .then( data =>{
            res.render('giohang',{
                carts : data,
                username : req.session['username'] || req.session.user
            })
        } )
}
exports.thanhtoan = (req,res) =>{
    db.any('SELECT * FROM information')
        .then( data =>{
            res.render('thanhtoan',{
                carts : data,
                username : req.session['username'] || req.session.user
            })
        } )
}

