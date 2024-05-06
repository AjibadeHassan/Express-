import express, { json } from "express";
import { validationResult, checkSchema } from 'express-validator'
import cookieParser from "cookie-parser";
import { mockUsers } from "./utils/Constant.mjs";
import indexRouter from "../Routes/Index.mjs"
import { loggingMiddleware } from "./utils/Middlewares.mjs";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import './Strategies/Strategies.mjs'


const app = express()

mongoose.connect('mongodb://localhost/express_tutorial')
.then(()=> console.log('connected to the database'))
.catch((err)=> console.log(`Error: ${err}`))

app.use(json())
app.use(cookieParser())
app.use(session({
    secret: 'hassan the dev',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(indexRouter)
app.use(loggingMiddleware)


const PORT = process.env.PORT || 3001;


// GET METHOD

app.get("/",
       (req, res)=>{
        req.session.visited= true
        console.log(req.session, req.session.id)
        res.cookie('hello', 'world', { maxAge: 60000 * 60 * 2 })
        const result = validationResult(req)
        if(!result.isEmpty()) return res.send({ error: result.array()}).status(400)
        
    res.status(200).send( {msg: 'hello'})
})







app.listen(PORT, ()=>{
    // console.log(`Running server on port ${PORT}`)
})