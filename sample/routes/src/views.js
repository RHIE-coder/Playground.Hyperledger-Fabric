const router = require('express').Router()
const {
    logined_redirect_home,
    not_logined_redirect_login,
} = require("../../middleware/access_control")

module.exports = {
    routers,
}

function routers(){
    router.get('/', (req,res)=>{
        res.render('index')
    })
    
    router.get('/login', logined_redirect_home, (req,res)=>{
        res.render('login')
    })
    
    router.get('/signup', logined_redirect_home, (req,res)=>{
        res.render('signup')
    })
    
    router.get('/profile', not_logined_redirect_login, (req,res)=>{
        res.render('profile')
    })

    router.get('/multipart', (req,res)=>{
        res.render('multipart')
    })

    return router
}
