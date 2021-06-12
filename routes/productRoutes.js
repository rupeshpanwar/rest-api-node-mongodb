const express = require('express')

const router = express.Router()

const productController = require('../controller/productController')

const joiSchemaValidation = require('../middleware/joiSchemaValidation')

const productSchema = require('../apiSchema/productSchema')

const validateToken = require('../middleware/tokenValidation')

router.post('/',
    validateToken.validateToken,
    joiSchemaValidation.validateBody(
        productSchema.createProductSchema),
    productController.createProduct
)

router.get('/:id',
    validateToken.validateToken,
    productController.getProductById
)

router.put('/:id',
    validateToken.validateToken,
    joiSchemaValidation.validateBody(productSchema.updateProductSchema),
    productController.updateProduct
)

router.delete('/:id',
    validateToken.validateToken,
    productController.deleteProduct
)

router.get('/',
    validateToken.validateToken,
    joiSchemaValidation.validateQueryParams(productSchema.getAllProductsSchema),
    productController.getAllProducts
)


module.exports = router