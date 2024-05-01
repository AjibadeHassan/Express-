import express, { json } from "express";

const app = express()

app.use(json())
const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`)
    next()
}

// MIDDLEWARES

app.use(loggingMiddleware)

const resolveIndexByUserId = (req, res, next) => {
    const { params : { id } } = req;
    const parsedID = parseInt(id)
    
    if(isNaN(parsedID)) return res.sendStatus(400);

    const findUser = mockUsers.findIndex((user)=> user.id === parsedID);

    if(findUser === -1) return res.sendStatus(404);

    req.findUser = findUser;
    next()
    // next(new Error('an error occured'))

}

const PORT = process.env.PORT || 3001;

const mockUsers = [
    {'id':0, 'name': 'hassan', 'displayName': 'Hassan'},
    {'id':1, 'name': 'emma', 'displayName': 'Emma' },
    {'id':2, 'name': 'samad', 'displayName': 'Samad' }
]

// GET METHODS

app.get("/", (req, res)=>{
    res.status(200).send( {msg: 'hello'})
})

app.get('/api/users', (req, res)=>{
    res.send(mockUsers).status(200)
       
})


app.get('/api/users/:id', resolveIndexByUserId, (req,res)=>{
    
    const { findUser } = req;
    const findUsers = mockUsers[findUser]
    if(!findUsers) return res.sendStatus(404);
    res.send(findUsers).status(200)
    
})

// POST METHOD 
app.post('/api/users', (req, res)=>{
    const { body } = req
    const newUser = { id: mockUsers.length, ...body}
    mockUsers.push(newUser)
    // console.log(req.body.name)
    res.status(201).send(newUser)
})

// PUT METHOD

app.put(  '/api/users/:id',resolveIndexByUserId, (req, res)=> {
  const { body, findUser } = req

    mockUsers[findUser] = {id: mockUsers[findUser].id, ...body}
    res.sendStatus(204)
})

// PATCH METHOD

app.patch('/api/users/:id', resolveIndexByUserId, (req, res)=>{
    const {
        body,
      findUser
    } = req;
    mockUsers[findUser] = { ...mockUsers[findUser], ...body}
    res.status(200).send(body)

})


// DELETE METHOD

app.delete('/api/users/:id', (req, res)=>{
    const {
       findUser
    } = req;
    mockUsers.splice(findUser, 1);

    res.sendStatus(200);
})
















app.listen(PORT, ()=>{
    // console.log(`Running server on port ${PORT}`)
})