const Product = require("../database/models/productModel");

module.exports.createProduct = async (serviceData) => {
    try {
        const product = new Product({ ...serviceData });
        let result = await product.save();
        return result.toObject();
    } catch (error) {
        console.log('something went wrong:Service:createProduct', error)
        throw new Error(error)
    }
}