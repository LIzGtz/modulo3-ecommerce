const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user.model');
const Product = require('../models/product.model');
const { Op } = require('sequelize');

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

const getProductsInExistence = async () => {
    let productsInExistence = await Product.findAll({
        where: {
            availableQty: {
                [Op.gt]: 0
            }
        },
        include: User
    });

    const returnValue = productsInExistence.map(p => {
        return {
            id: p.id,
            name: p.name,
            price: p.price,
            availableQty: p.availableQty,
            imageUrl: p.imageUrl,
            userName: p.user.userName
        }
    });
    return {
        success: true,
        message: '',
        data: returnValue
    };
};

module.exports = {
    create,
    getProductsInExistence
};