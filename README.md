# Basic setup

mkdir node-api
npm init -y
in package.json >
change
main:server.js
"type": "module",

then install few package
npm i express dotenv

touch .env
PORT = 3002

touch server.js #to setup the server

to listen on port, define the route
app.get()

run > node server.js

in order to server restart frequently , install nodemon

npm i -D nodemon

in package.json

> add script

    x "start": "node server.js",
    x "dev": "nodemon server.js"

run > npm run dev

```
server.js

        import express from 'express';
        import dotenv from 'dotenv';

        dotenv.config()

        const app = express()

        app.get('/', (req, res, next) => {
            res.send('API Server is listening')
        })

        const PORT = process.env.PORT || 3000

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })


```

### 2. Express Middleware

> npm i cors

    x register cors with app.use
    x request payload middleware
    x include error middleware

https://expressjs.com/en/guide/using-middleware.html

```
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {}
    })
})
```

### 3. DB Connectivity

#use MongoDB librarry

> npm i mongoose

.env

> define DB_URL

mkdir database

touch database\connection.js

. write mongoose
.connect(DB_URL,useNewUrlParser) module

> server.js

    . import dbConnection
    . initiate dbConnection() method
