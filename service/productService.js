const constants = require("../constants");
const Product = require("../database/models/productModel");
const { formatMongoData, checkValidId } = require("../helper/dbHelper");


module.exports.createProduct = async (serviceData) => {
    try {
        const product = new Product({ ...serviceData });
        let result = await product.save();
        return formatMongoData(result)
    } catch (error) {
        console.log('something went wrong:Service:createProduct', error)
        throw new Error(error)
    }
}

module.exports.getAllProducts = async ({ skip = 0, limit = 10 }) => {
    try {
        const products = await Product.find({}).skip(parseInt(skip)).limit(parseInt(limit))
        return formatMongoData(products)

    } catch (error) {
        console.log('something went wrong:Service:getAllProducts', error)
        throw new Error(error)

    }
}

module.exports.getProductById = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await productService.getProductById(req.params);
        response.status = 200;
        response.message = constants.productMessage.PRODUCT_FETCHED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: getProductById', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}


module.exports.updateProduct = async ({ id, updateInfo }) => {
    try {
        checkValidId(id)
        let product = await Product.findOneAndUpdate({
            _id: id
        },
            updateInfo,
            { new: true }
        )

        if (!product) {
            throw new Error(constants.productMessage.PRODUCT_NOT_FOUND)
        }
        return formatMongoData(product)
    } catch (error) {
        console.log('something went wrong:Service:updateProduct', error)
        throw new Error(error)
    }
}

module.exports.deleteProduct = async ({ id }) => {
    try {
        checkValidId(id)
        let product = await Product.findByIdAndDelete(id)
        if (!product) {
            throw new Error(constants.productMessage.PRODUCT_NOT_FOUND)
        }
        return formatMongoData(product)
    } catch (error) {
        console.log('something went wrong:Service:deleteProduct', error)
        throw new Error(error)

    }
}