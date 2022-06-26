import { InternalServerError } from "../utils/error.js"
import model from "../utils/model.js"

const GET = (req, res, next) =>{
     try {
        let subCategory = model.road('subCategory')
        let products = model.road('protucts')
        subCategory.map(sub =>{
            sub.products = products.filter(products => products.sub_category_Id == sub.sub_category_Id)
        })

        
       
        model.write('subCategory',subCategory)
       res.status(200).send(subCategory)
     } catch (error) {
        return next( new InternalServerError(500,error.message))
     }
}

const POST = (req, res, next) =>{
    try {
       let subCategory = model.road('subCategory')
  

      req.body.sub_category_Id = subCategory.at(-1).sub_category_Id +1 || 1

      subCategory.push(req.body)

       model.write('subCategory',subCategory)

      res.status(200).send( subCategory )

    } catch (error) {
       return next( new InternalServerError(500,error.message))
    }
}

const PUT = (req, res, next) =>{
    try {
       let subCategory = model.road('subCategory')

       let update = subCategory.find(cate => cate.sub_category_Id == req.params.Id)
        if (update) update.sub_category_name = req.body.sub_category_name

       model.write('subCategory',subCategory)

      res.status(200).send( subCategory )

    } catch (error) {
       return next( new InternalServerError(500,error.message))
    }
}


const DELETE = (req, res, next) =>{
    try {
       let subCategory = model.road('subCategory')

       let deleted = subCategory.filter(cate => cate.sub_category_Id !=req.params.Id)

       model.write('subCategory',deleted)

      res.status(200).send(deleted)

    } catch (error) {
       return next( new InternalServerError(500,error.message))
    }
}


export default {
    GET,
    POST,
    PUT,
    DELETE
}