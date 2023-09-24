const { Router } = require('express');

const router = Router();

router.post('/login', (req,res)=>{
    const { username, password } = req.body;
    // var {user} = req.session;
    if(username && password){
        if(req.session.user) {
            res.send(req.session.user)
        } else {
            req.session.user = {
                username,
            }
            res.send(req.session);
        }
    } else {
        res.send(401);
    }
})

module.exports = router;