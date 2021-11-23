const router = require('express').Router();

module.exports = {
    params : ['upload'],
    routers,
}

function routers(upload){
    router.post('/stats', upload.fields([
        { name: 'uploaded_file'},
        { name: 'content'}
      ]), function(req, res){
        console.log(req.files);
        console.log(req.body.content);
        res.send("성공");
      })

    return router;
}