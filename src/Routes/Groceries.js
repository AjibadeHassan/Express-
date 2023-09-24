const {Router} = require('express')

const router = Router()

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

router.use((req,res,next)=>{
    if(req.session.user){
        next()
    } else {
        res.send(401)
    }
})


router.get('/', (req,res)=>{
    res.cookie('visited', true, {
        maxAge: 60000
    })
    res.send(groceryList)
    
})

router.get('/:item',(req,res)=>{
    console.log(req.cookies)
    const {item} = req.params;
    const groceryItem = groceryList.find(g => g.item === item)
    res.send(groceryItem);
})

router.post('/', (req,res)=>{
    groceryList.push(req.body)
    console.log(groceryList)
    res.send(201)
});

module.exports = router;