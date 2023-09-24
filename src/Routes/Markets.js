const { Router } = require('express')

const router = Router();

const marketList = [
    {
        id: 1,
        store: 'walmart',
        item: 'bread',
        price: 1500
    },

    {
        id: 2,
        store: 'shoprite',
        item: 'beverage',
        price: 500
    },

    {
        id: 3,
        store: 'jumia',
        item: 'energy drink',
        price: 1500
    }
];

router.use((req,res,next)=>{
    if(req.session.user){
        next()
    } else {
        res.send(401)
    }
})

router.get('/', (req,res)=>{
    const {price} = req.query;
    const parsedPrice = parseInt(price);
    if(!isNaN(parsedPrice)) {
       const filteredMarket = marketList.filter(s=>s.price <= parsedPrice);
       res.send(filteredMarket)
    } else {
        res.send(marketList)
    }
});

router.get('/:item', (req,res)=>{
    const {item} = req.params;
    const marketItem = marketList.find(s => s.item === item);
    console.log(req.query)
    res.send(marketItem)
})

router.post('/',(req,res)=>{
    marketList.push(req.body)
    res.send(201)
})
module.exports = router;