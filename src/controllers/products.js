import { InternalServerError } from "../utils/error.js"
import model from "../utils/model.js"

const GET =(req, res, next) =>{
    try {
        let products = model.road('protucts')
         
        let{userId,search} = req.query
        console.log(userId,search)
        
     
    let data =  products.filter(product =>{
  
        let byuserId = userId ? product.product_Id == userId : true
        let bySearch = search ? product.color.toLowerCase().includes(search.toLowerCase()) || product.produc_name.toLowerCase().includes(search.toLowerCase()) || product.model.toLowerCase().includes(search.toLowerCase()) : true
         

        return byuserId && bySearch
      })

      res.status(200).send(data)
    } catch (error) {
        return next( new InternalServerError(500, error.message))
    }
}

const POST =(req, res, next) =>{

    try {
        let products = model.road('protucts')
    req.body.product_Id = products.at(-1).product_Id + 1 || 1
    
    products.push(req.body)

    model.write('protucts',products)

    res.status(200).send({data:req.body})

    } catch (error) {
        return next( new InternalServerError(500, error.message))
    }
    
}

const PUT = (req ,res ,next) =>{
      try {
        let products = model.road('protucts')

        let update = products.find(product => product.product_Id == req.params.Id)
        if (update) {
            update.sub_category_Id = req.body.sub_category_Id,
            update.model = req.body.model,
            update.produc_name = req.body.produc_name,
            update.color = req.body.color,
            update.price = req.body.price
        }
    console.log(update)
 
        model.write('protucts', products)
        res.status(200).send(products)
      } catch (error) {
        return next( new InternalServerError(500, error.message))
      }
}

const DELETE = (req ,res ,next) =>{
    try {
      let products = model.road('protucts')
      let deleted = products.filter(cate => cate.product_Id !=req.params.Id)
        
      model.write('protucts', deleted)
      res.status(200).send({
          status: 200,
          data: deleted
      })
    } catch (error) {
      return next( new InternalServerError(500, error.message))
    }
}


export default {
    GET,
    POST,
    PUT,
    DELETE
}