import {Router} from "express";
import controller from '../controllers/products.js'
import ChekToken from '../middlewares/ChekToken.js'
const router = Router()

router.get('/poducts/all',controller.GET)
router.get('/poducts/all/:userId',controller.GET)
router.post('/poducts/all',ChekToken,controller.POST)
router.put('/poducts/all/:Id',ChekToken,controller.PUT)





export default router