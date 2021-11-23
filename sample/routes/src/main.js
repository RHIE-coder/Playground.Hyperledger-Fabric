const router = require('express').Router()
const {
    logined_redirect_home,
    not_logined_redirect_login,
} = require("../../middleware/access_control")

module.exports = {
    params : ['passport'],
    routers,
}

function routers(passport){
    router.post('/login',passport.authenticate('local-login',{
        successRedirect: '/',
        failureRedirect: '/login'
    }))

    router.post('/signup',passport.authenticate('local-signup',{
        successRedirect: '/',
        failureRedirect: '/signup'
    }))

    router.get('/logout', not_logined_redirect_login, (req,res)=>{
        req.logout();
        res.render('index');
    })

    router.post('/check/login', (req, res) => {
        const isLogin = req.isAuthenticated();
        res.send({isLogin});
    })

    return router
}