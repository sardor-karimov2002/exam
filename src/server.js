import express from "express";
import fs from 'fs'
import path from "path";
const PORT = process.env.PORT || 6666

import ChekToken from "./middlewares/ChekToken.js";
const app = express()
app.use(express.json())
app.use( ChekToken )

import usersRouters from './Routers/user.js'
app.use(usersRouters)

import postsRouter from './Routers/post.js'
app.use(postsRouter)


app.use((error, req, res, next) => {
    if (error.status != 500) {
        res.status(error.status).json({
            status: error.status,
            message: error.message
        })
    }

    res.status(error.status).json({
        status: error.status,
        message:"InternalServerError"
    })

    fs.appendFileSync(path.join(process.cwd(), 'src', 'Errors.txt'),
        `${req.url}___${error.name}___${'Time' + ' ' + Date.now()}___${error.message}\n`)

    process.exit()
})
app.listen(6666, () => console.log(`${PORT + 'active........'}`))