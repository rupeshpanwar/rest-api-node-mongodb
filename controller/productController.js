const productService = require('../service/productService')
const constants = require('../constants')

module.exports.createProduct = async (req, res) => {
    let response = { ...constants.defaultServerResponse }

    try {
        const responseFromService = await productService.createProduct(req.body)
        response.status = 200
        response.message = constants.productMessage.PRODUCT_CREATED
        response.body = responseFromService

    } catch (error) {
        console.log('something went wrong: Controller: createProduct', error)
        response.status = constants.defaultServerResponse.status
        response.message = constants.defaultServerResponse.message
        response.body = error.message
    }

    return res
        .status(response.status)
        .send(response)
}