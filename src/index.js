const express = require('express');


const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded())
app.use((req,res,next) =>{
    console.log(req.url);
    next()
})

app.listen(PORT, ()=>{
    console.log(groceryList)
})

const groceryList = [
    {
        item: "milk",
        price: 2000,
        quantity: 20

    },
    {
        item: "cheese",
        price: 2000,
        quantity: 20

    },
    {
        item: "butter",
        price: 2000,
        quantity: 20

    },
]

app.get('/groceries', (req,res)=>{
    res.send(groceryList)
    
})

app.get('/groceries/:item',(req,res)=>{
    const {item} = req.params;
    const groceryItem = groceryList.find(g => g.item === item)
    res.send(groceryItem);
})

app.post('/groceries', (req,res)=>{
    groceryList.push(req.body)
    console.log(groceryList)
    res.send(201)
});