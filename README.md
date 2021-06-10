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

### 4. Create Product Model n Schema

> touch database/models/productModel.js

    . import mongoose
    . define product schema(mongoose.Schema)
    . mongoose.model(Product,productSchema)

### 5. POST API : Create Product

#Routes , controller, service
**here is the path to follow** -[x] constants <= index.js -[x] Base path <= server -[x] route(post) <= productRoutes -[x]send to createProduct service <= roductController
& response to client with data -[x] create data & save <=productService
& set response , data to controller

> download POSTMAN to test api

_define base level route path in app.use()_
x app.use('/api/v1/product',require('./routes/productRoutes'))

mkdir constants

> touch index.js

    x     define defaultServerResponse
    status : 400
    message: ''
    body: {}
    x productMessage{ Product_Created}

mkdir routes

> touch productRoutes.js

     x import express
     x express.Router()
     x router.post('/,productController.createProduct)
     x import productController

**test in postman**
mkdir controller

> touch productController.js

        x import constants
        x createProduct(res.send(product created successfully))
        x console.log(req.body)
        x import productService
        x productService.createProduct(req.body)
        x let response = {...constants.defaultServerResponse}
        x response.message = constants.productMessage.Product_Created

**test in postman**
_ send product info via POSTMAN
_ now pass req.body to Service (business logic) to submit the info into DB

> productService.js

    x import productModel here(to create in DB)
    x createProduct(serviceData=req.body) method
    x new Product(...serviceData)
    x product.save()

> productController

- receive the result from Service
- create response object in below format as in error middleware
- response.status , .message , .body
- return res.status(response.status).send(response)

**test in postman**

```
raw => body
{
    name:
    price:
    brand:
}


```

### 6. toObject Transform => id & v

https://mongoosejs.com/docs/api.html#document_Document-toObject

> productModel

    * below timestamps,
    toObject:{
        transform: function(doc,ret,options){
            ret.id = ret._id;
            delete ret._id
            delete ret.__v
            return ret
        }
    }

> productService

    * let result = await product.save
    * return result.to'()

### 7. Create product API Schema - datatype/ extra field validation , to check request payload

https://www.npmjs.com/package/@hapi/joi

npm install @hapi/joi@15.1.0

mkdir apiSchema

> productSchema.js

    x import Joi
    x createProductSchema = Joi.object().keys()

### 8. API schema validation middleware (routes)

> constants

    x add requestValidationMessage : BAD_REQUEST: invalid field

mkdir middleware

> touch joiSchemaValidation.js

    x method validateBody(schema){
        validateObjectSchema(req.body,schema);
    }
    x validateObjectSchema(data,schema){
        joi.validate(data,schema,{covert:false})
    x result.error.detail
    x errorDetails = result.error.detail.map
    }

    x TEST in POSTMAN
    x add error block

> productRoutes

    x add schemaMiddleware(joiSchemaValidation) here
    x import productSchema
    x router.post('/',jsv.validateBody(
        productSchema.createProductSchema
    ),productController.createProduct)
    x add error block

### 9. Pagination - List product

summary

- ProductRoute => add route router.get()
- ProductService => create getAllProducts()
  => PRoduct.find({})
- ProductController => call getAllProducts() service & set the response for router/client
- index => add PRoduct_Fetched message

Apply a DB helper to convert toObject

- touch helper/dbHelper.js
- create method formatMongoData(data as an array)
- check if array or not then apply toObject for conversion
- productService.js => import formatMongoDB
- call formatMongoDB from createProduct / getAllProduct
