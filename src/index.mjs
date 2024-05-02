import express, { json } from "express";
import { validationResult, checkSchema } from 'express-validator'
import cookieParser from "cookie-parser";
import userRouter from '../Routes/Users.mjs'
import { mockUsers } from "./utils/Constant.mjs";
import { loggingMiddleware } from "./utils/Middlewares.mjs";
import productRouter from '../Routes/Products.mjs'
import session from "express-session";


const app = express()

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
app.use(productRouter)
app.use(userRouter)
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