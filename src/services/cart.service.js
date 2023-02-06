const { Cart, CartItem } = require("../models/cart.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

/**
 * Product data
 * @typedef {Object} NewCartItem
 * @property {int} productId - Product id
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
 * Adds a product to user's cart
 * @param {NewCartItem} cartItemData 
 * @returns {Promise<Result>} The operation result
 */ 
const addProductToCart = async (cartItemData) => {
    const user = await User.findByPk(cartItemData.userId);

    if (user == null) {
        return {
            success: false,
            message: `User '${cartItemData.userId}' does not exist.`
        };
    }

    const product = await Product.findByPk(cartItemData.productId);

    if (product == null) {
        return {
            success: false,
            message: `Product '${cartItemData.productId}' not found.` 
        };
    }

    if (product.availableQty <= 0) {
        return {
            success: false,
            message: `Product '${cartItemData.productId}' is not available.` 
        };
    }

    let cart = await user.getCart();
    if (cart == null) {
        cart = await user.createCart({ totalAmount: 0 });
    }
    console.log('cart = ', cart);
    const cartItem = await CartItem.create({
        cartId: cart.id,
        productId: product.id
    });

    cart.totalAmount += product.price;
    await cart.save();
    // await cartItem.save();
    // await cart.addCartItem(cartItem);
    // await cart.save();
    // await CartItem.create({
    //     cartId: cart.id,
    //     productId: product.id
    // });
    // const cart = Cart.findOrBuild({
    //     where: {
    //         userId: cartItemData.userId
    //     }
    // })
    return {
        success: true,
        message: '',
        data: cart
    };
};

module.exports = {
    addProductToCart
}