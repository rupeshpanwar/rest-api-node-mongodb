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
add script
"start": "node server.js",
"dev": "nodemon server.js",

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
