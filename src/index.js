const express = require('express');


const app = express();
const PORT = 3001;

app.listen(PORT, ()=>{
    console.log('HELLO')
})

const groceryList = []

app.get('/groceries', (req,res)=>{
    res.send([
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
            item: "diapers",
            price: 2000,
            quantity: 20

        },
    ])
})