import { InternalServerError, AuthrizatsiaError, ForbiddinError } from "../utils/error.js"
import modle from '../utils/model.js'

const GET = (req, res, next) => {
    try {
        let posts = modle.road('posts')
        let users = modle.road('users')
        let {postId} = req.params

       posts = posts.map(post =>{
        post.user = users.find(user => user.userId == post.userId)
        delete post.userId
        delete post.user.password
        return post
       })

        if(postId){
           
            return res.status(200).send(
                posts.find(post => post.postId == postId)
            
            )
        }
     

        res.status(200).send(posts)
    } catch (error) {
            return next( new InternalServerError(501,error.message))
    }
}
export default {
    GET
}
