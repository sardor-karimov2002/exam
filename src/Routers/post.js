import {Router} from "express";
import controller from '../controllers/posts.js'
import validation from "../middlewares/validation.js";
const router = Router()

router.get('/posts',validation, controller.GET)
router.get('/posts/:postId',validation,controller.GET)

export default router