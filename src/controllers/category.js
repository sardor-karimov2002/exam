import model from "../utils/model.js"
import { ValidationError, InternalServerError } from "../utils/error.js"
const GET = (req, res, next) => {
    try {
        let subCategory = model.road('SubCategory')
        let category = model.road('category')

        category.map(category => {
            category.subcategory = subCategory.filter(sub => {
                let filterd = sub.categoriya_Id == category.categoriya_Id
                delete sub.products
                return filterd
            })
        })

        model.write('category', category)
        res.status(200).send(category)

        return next(new ValidationError(402, "Forbiddin acsess"))

    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

const POST = (req, res, next) => {
    try {

        let { token } = req.headers

        let category = model.road('category')

        if (!token) {
            return next(new ValidationError(403, 'your not token'))
        }

        req.body.categoriya_Id = category.at(-1).categoriya_Id + 1 || 1,
            category.push(req.body)
        model.write('category', category)
        res.status(200).send({
            status: 200,
            data: req.body
        })
        return next(new ValidationError(403, error.message))
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}


const PUT = (req, res, next) => {
    try {

        let { token } = req.headers

        let category = model.road('category')

        if (!token) {
            return next(new ValidationError(403, 'your not token'))
        }

        let update = category.find(cate => cate.categoriya_Id == req.params.Id)
        if (update) update.categoriya_name = req.body.categoriya_name



        model.write('category', category)
        res.status(200).send({
            status: 200,
            data: update
        })
        return next(new ValidationError(403, error.message))
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

const DELETE = (req, res, next) => {
    try {

        let { token } = req.headers

        let category = model.road('category')

        if (!token) {
            return next(new ValidationError(403, 'your not token'))
        }

        let deleted = category.filter(cate => cate.categoriya_Id !=req.params.Id)
        
        model.write('category', deleted)
        res.status(200).send({
            status: 200,
            data: deleted
        })
        return next(new ValidationError(403, error.message))
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

export default {
    GET,
    POST,
    PUT,
    DELETE
}