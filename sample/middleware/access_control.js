function logined_redirect_home(req, res, next) {
    console.log('logined_redirect_home() is invoked : ' + req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
}

function not_logined_redirect_login(req, res, next) {
    console.log('not_logined_redirect_login() is invoked : ' + req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    logined_redirect_home,
    not_logined_redirect_login,
}