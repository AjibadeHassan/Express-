const express = require('express');
const groceriesStoreRoutes = require('./Routes/Groceries')
const marketRoutes = require('./Routes/Markets')
const cookieParser = require('cookie-parser')

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())
app.use('/api/groceries',groceriesStoreRoutes)
app.use('/api/markets', marketRoutes)
app.use((req,res,next) =>{
    console.log(req.url);
    next()
})

app.listen(PORT, ()=>{})


