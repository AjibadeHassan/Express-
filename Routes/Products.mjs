import { Router } from "express";

const router = Router();

router.get('/api/products', (req, res)=> {
    console.log(req.headers.cookie)
    console.log(req.cookies)
    res.status(200).send([{name: 'Milk', category: 'Grocery', price: 200, amount: 10}])
})


export default router