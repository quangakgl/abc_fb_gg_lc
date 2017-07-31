/**
 * Created by quang on 19/07/2017.
 */
module.exports = {
    restrict: (req, res, next) => {
        if (req.isAuthenticated()) {
            //req.session.login = true;
            req.session.user = req.user;
            console.log(req.user)
        } else {
            //req.session.login = false;
            console.log('dkmm')
        }
        next();
    }
}
// module.export.restrict = (req, res, next) => {
//     console.log(req.isAuthenticated());
//     if (req.isAuthenticated()) {
//         req.session.user = req.user;
//         next();
//     } else {
//         res.redirect('/');
//     }
// }