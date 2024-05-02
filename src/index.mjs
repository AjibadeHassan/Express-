import express, { json } from "express";
import { validationResult, checkSchema } from 'express-validator'
import { queryValidationSchema } from "./utils/ValidationSchema.mjs";
import userRouter from '../Routes/Users.mjs'
import { mockUsers } from "./utils/Constant.mjs";
import { loggingMiddleware } from "./utils/Middlewares.mjs";
const app = express()

app.use(json())
app.use(userRouter)
app.use(loggingMiddleware)


const PORT = process.env.PORT || 3001;


// GET METHOD

app.get("/",checkSchema(queryValidationSchema),
       (req, res)=>{
        const result = validationResult(req)
        if(!result.isEmpty()) return res.send({ error: result.array()}).status(400)
    res.status(200).send( {msg: 'hello'})
})







app.listen(PORT, ()=>{
    // console.log(`Running server on port ${PORT}`)
})