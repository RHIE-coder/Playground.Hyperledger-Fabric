const router = require('express').Router();

module.exports = {
    ignore : true,
    routers,
}


function routers(){
    router.get('/test/access', (req,res)=>{
        const message = "success"
        res.send({message})
    })

    return router
}
