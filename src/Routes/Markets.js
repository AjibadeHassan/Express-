const { Router } = require('express')

const router = Router();

const marketList = [
    {
        store: 'walmart',
        item: 'bread',
        price: 1500
    },

    {
        store: 'shoprite',
        item: 'beverage',
        price: 500
    },

    {
        store: 'jumia',
        item: 'energy drink',
        price: 1500
    }
];
router.get('', (req,res)=>{
    res.send(marketList)
});

router.post('',(req,res)=>{
    marketList.push(req.body)
    res.send(201)
})
module.exports = router;