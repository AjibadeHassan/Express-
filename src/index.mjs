import express, { json } from "express";

const app = express()

app.use(json())

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
    res.send(mockUsers)
       
})


app.get('/api/users/:id', (req,res)=>{
    const parsedID = parseInt(req.params.id)
    console.log(parsedID)
    const findUsers = mockUsers.find((users)=> users.id === parsedID)
    if(isNaN(parsedID)) return res.sendStatus(404);

    if(findUsers) return res.send(findUsers)
    
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

app.put('/api/users/:id', (req, res)=> {
    const {
        body,
        params : { id }
    } = req;
    const parsedID = parseInt(id)
    
    if(isNaN(parsedID)) return res.sendStatus(400);

    const findUser = mockUsers.findIndex((user)=> user.id === parsedID);

    if(findUser === -1) return res.sendStatus(404);

    mockUsers[findUser] = {id: parsedID, ...body}
    res.sendStatus(204)
})

// PATCH METHOD

app.patch('/api/users/:id', (req, res)=>{
    const {
        body,
        params : { id }
    } = req;

    const parsedID = parseInt(id);
    if(isNaN(parsedID)) return res.sendStatus(400)
    const findUser = mockUsers.findIndex((user)=> user.id === parsedID)
    
    if(findUser === -1) return res.sendStatus(404);

    mockUsers[findUser] = { ...mockUsers[findUser], ...body}
    res.status(200).send(body)

})

app.listen(PORT, ()=>{
    // console.log(`Running server on port ${PORT}`)
})