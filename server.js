import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'


dotenv.config()

const app = express()

app.use(cors())

//request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    res.send('API Server is listening')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {}
    })
})
