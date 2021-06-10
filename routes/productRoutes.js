const express = require('express')

const router = express.Router()

const productController = require('../controller/productController')

const joiSchemaValidation = require('../middleware/joiSchemaValidation')

const productSchema = require('../apiSchema/productSchema')

router.post('/',
    joiSchemaValidation.validateBody(
        productSchema.createProductSchema),
    productController.createProduct
)

router.get('/',
    joiSchemaValidation.validateQueryParams(productSchema.getAllProductsSchema),
    productController.getAllProducts
)


module.exports = router