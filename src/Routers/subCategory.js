import {Router} from "express";
import controller from '../controllers/subCategory.js'
import ChekToken from '../middlewares/ChekToken.js'
const router = Router()

router.get('/subcategories', controller.GET)
router.post('/subcategories',ChekToken, controller.POST)
router.put('/subcategories/:Id',ChekToken, controller.PUT)
router.delete('/subcategories/:Id',ChekToken, controller.DELETE)






export default router