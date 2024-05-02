import { Router } from "express";
import userRouter from "./Users.mjs";
import productRouter from "./Products.mjs"
import authrouter from "./Auth.mjs"

const router = Router()

router.use(userRouter)
router.use(productRouter)
router.use(authrouter)

export default router