import { ForbiddinError } from "../utils/error.js";
import jwt from "../utils/jwt.js";

export default (req,res,next) =>{
    try {
        if(req.url == '/register' || req.url == '/login'){
            return next()
        }
        let {token} = req.headers
        if(!token){
            return next(new ForbiddinError(403,'token reqired'))
        }

        let {userId} = jwt.veryfy(token) 

        req.userId = userId

        return next()
    } catch (error) {
        return next(new ForbiddinError(403,error.message))
    }
}