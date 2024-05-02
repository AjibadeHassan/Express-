import { Router } from "express";
import session from "express-session";

const router = Router();

router.get('/api/products', (req, res)=> {
    console.log(req.session)
    console.log(req.session.id)
    console.log(req.cookies)
    res.status(200).send([{name: 'Milk', category: 'Grocery', price: 200, amount: 10}])
})


export default router