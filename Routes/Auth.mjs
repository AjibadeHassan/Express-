import { Router } from "express";
import passport from "passport";
import '../src/Strategies/Strategies.mjs'

const router = Router()

router.post('/api/auth', passport.authenticate('local'),(req, res)=>{
    res.send(req.body)
})

export default router;