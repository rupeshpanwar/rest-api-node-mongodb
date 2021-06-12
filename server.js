const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const dbConnection = require('./database/connection');

dotenv.config()

const app = express()

//db connection
dbConnection()

//cors
app.use(cors())

//request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//product base path route
app.use('/api/v1/product', require('./routes/productRoutes'));

//user base path route
app.use('/api/v1/user',
    require('./routes/userRoutes'))

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
