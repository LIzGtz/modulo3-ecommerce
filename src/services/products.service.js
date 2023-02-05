const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user.model');
const Product = require('../models/product.model');

/**
 * Product data
 * @typedef {Object} NewProductData
 * @property {string} name - Product name
 * @property {string} price - Product price
 * @property {string} availableQty - Product quantity in stock
 * @property {string} imageUrl - Product image
 * @property {int} userId - User
 */

/**
 * Operation Result
 * @typedef {Object} Result
 * @property {boolean} success - Operation result
 * @property {string} message - Result message
 * @property {*} data - Optional additional data
 */

/**
 * Creates a new product
 * @param {NewProductData} productData 
 * @returns {Promise<Result>} The operation result
 */
const create = async (productData) => {
    const user = await User.findByPk(productData.userId);

    if (user == null) {
        return {
            success: false,
            message: `User '${productData.userId}' does not exist.`
        };
    }

    let product = await Product.create(productData);

    return {
        success: true,
        message: '',
        data: product
    };
};

module.exports = {
    create
};