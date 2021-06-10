const Product = require("../database/models/productModel");
const { formatMongoData } = require("../helper/dbHelper");


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

module.exports.getAllProducts = async (serviceData) => {
    try {
        const products = await Product.find({})
        return formatMongoData(products)

    } catch (error) {
        console.log('something went wrong:Service:getAllProducts', error)
        throw new Error(error)

    }
}