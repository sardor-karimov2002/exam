import {Router} from "express";
import controller from '../controllers/category.js'
import ChekToken from '../middlewares/ChekToken.js'
const router = Router()

router.get('/category', controller.GET)
router.post('/category',controller.POST)
router.put('/category/:Id',controller.PUT)
router.delete('/category/:Id',controller.DELETE)




export default router