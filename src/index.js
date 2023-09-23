const express = require('express');
const groceriesStoreRoutes = require('./Routes/Groceries')
const marketRoutes = require('./Routes/Markets')
const cartRoutes = require('./Routes/Cart')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'AQWEQWYERWOFIEOUEWFG',
    resave: false,
    saveUninitialized: false
}))
app.use('/api/groceries',groceriesStoreRoutes)
app.use('/api/markets', marketRoutes)
app.use('/api/shopping/cart', cartRoutes)
app.use((req,res,next) =>{
    console.log(req.url);
    next()
})



app.listen(PORT, ()=>{})


