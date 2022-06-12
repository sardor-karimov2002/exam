import express from "express";
import fs from 'fs'
import path from "path";
const PORT = process.env.PORT || 6666
const app = express()
app.use(express.json())

import usersRouters from './Routers/Roures.js'

app.use(usersRouters)

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