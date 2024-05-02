import { Router } from "express";
import { mockUsers } from "../src/utils/Constant.mjs";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { createUserValidationSchema } from "../src/utils/ValidationSchema.mjs";
import { resolveIndexByUserId } from "../src/utils/Middlewares.mjs";

const router = Router()

router.get('/api/users', (req, res)=>{
    res.send(mockUsers).status(200)
       
})


router.get('/api/users/:id', resolveIndexByUserId, (req,res)=>{
    
    const { findUser } = req;
    const findUsers = mockUsers[findUser]
    if(!findUsers) return res.sendStatus(404);
    res.send(findUsers).status(200)
    
})

router.post('/api/users', checkSchema(createUserValidationSchema),
        (req, res)=>{
            const result = validationResult(req)

            if(!result.isEmpty()) return res.status(400).send({ error: result.array()})
            const data = matchedData(req)

            
            const newUser = { id: mockUsers.length, ...data}
            mockUsers.push(newUser)
            // console.log(req.body.name)
            res.status(201).send(newUser)
})


router.put(  '/api/users/:id',resolveIndexByUserId, (req, res)=> {
    const { body, findUser } = req
  
      mockUsers[findUser] = {id: mockUsers[findUser].id, ...body}
      res.sendStatus(204)
  })



  router.patch('/api/users/:id', resolveIndexByUserId, (req, res)=>{
    const {
        body,
      findUser
    } = req;
    mockUsers[findUser] = { ...mockUsers[findUser], ...body}
    res.status(200).send(body)

})

router.delete('/api/users/:id', (req, res)=>{
    const {
       findUser
    } = req;
    mockUsers.splice(findUser, 1);

    res.sendStatus(200);
})



  







export default router;