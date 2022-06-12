import sha256 from "sha256"
import { InternalServerError, AuthrizatsiaError, ForbiddinError } from "../utils/error.js"
import modle from '../utils/model.js'
import jwt from "../utils/jwt.js"

const GET = (req, res, next) => {
    try {
        let {userId} = req.params
        if(userId){
            let [user] = modle.road('users').filter(users => users.userId == userId)
            delete user.password
            return res.status(200).send(user)
        }
        let users = modle.road('users').filter(users => delete users.password)

        res.status(200).send(users)
    } catch (error) {
            return next( new InternalServerError(501,error.message))
    }



}

const LOGIN = (req, res, next) => {
    try {
        let { username, password } = req.body
        let users = modle.road('users')

        let user = users.find(user => user.username == username && user.password == sha256(password))
        if (!user) {
            return next(new AuthrizatsiaError(401, 'wrong username or password'))
        }
        delete user.password
        res.status(200).json({
            status: 200,
            message: 'sucsses',
            token: jwt.sign({ userId: user.userId }),
            data: user
        })

    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

const REGISTER = (req, res, next) => {
    try {
        let users = modle.road('users')
        req.body.userId = users.length ? users.at(-1).userId + 1 : 1

        req.body.password = sha256(req.body.password)

        let user = users.find(user => user.username == req.body.username)

        if (user) {
            return next(new AuthrizatsiaError(401, 'Such a user already exists'))
        }

        users.push(req.body)

        modle.write('users', users)

        delete req.body.password

        res.status(201).json({
            status: 201,
            message: "sucsses",
            token: jwt.sign({ userId: req.body.userId }),
            data: req.body

        })
    } catch (error) {
        return next(new InternalServerError(501, error.message))
    }
}

export default {
    GET,
    LOGIN,
    REGISTER
} 