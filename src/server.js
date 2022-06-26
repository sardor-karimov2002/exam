import express from "express";
import cors from 'cors'
import fs from 'fs'
import path from "path";
const PORT = process.env.PORT || 6666

const app = express()

app.use(cors())
app.use(express.json())


import usersRouters from './Routers/user.js'
app.use(usersRouters)

import CategoryRouter from './Routers/categorys.js'
app.use(CategoryRouter)

import SubCategoryRouter from './Routers/subCategory.js'
app.use(SubCategoryRouter)

import ProductsRouter from './Routers/products.js'
app.use(ProductsRouter)



app.use((error, req, res, next) => {
    if (error.status != 500) {
        res.status(error.status).json({
            status: error.status,
            message: error.message
        })
    }

    res.status(error.status).json({
        status: error.status,
        message:error.message
    })

    fs.appendFileSync(path.join(process.cwd(), 'src', 'Errors.txt'),
        `${req.url}___${error.name}___${'Time' + ' ' + Date.now()}___${error.message}\n`)

    process.exit()
})
app.listen(PORT, () => console.log(`${PORT + 'active........'}`))