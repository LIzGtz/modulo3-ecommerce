const { Cart, CartItem } = require("../models/cart.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

/**
 * Product data
 * @typedef {Object} NewCartItem
 * @property {int} productId - Product id
 * @property {int} quantity - Quantity
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

    if ((product.availableQty - cartItemData.quantity) < 0) {
        return {
            success: false,
            message: `Product '${cartItemData.productId}' is not available.` 
        };
    }

    let cart = await user.getCart();
    if (cart == null) {
        cart = await user.createCart({ totalAmount: 0 });
    }

    const cartItem = await CartItem.create({
        cartId: cart.id,
        productId: product.id,
        price: product.price,
        quantity: cartItemData.quantity
    });

    cart.totalAmount += product.price;
    await cart.save();
    
    product.availableQty -= cartItemData.quantity;
    await product.save();

    return {
        success: true,
        message: '',
        data: cart
    };
};

/**
 * Adds a product to user's cart
 * @param {int} userId 
 * @returns {Promise<Result>} The operation result
 */ 
const getCartItems = async (userId) => {
    const cartItems = await CartItem.findAll({
        where: {
            cartId: userId
        },
        include: Product
    });

    if (cartItems == null) {
        return {
            success: false,
            message: 'Cart not found.'
        };
    }

    const carts = cartItems.map(item => {
        return {
            cartId: item.cartId,
            productId: item.product.id,
            productName: item.product.name,
            price: item.product.price,
            imageUrl: item.product.imageUrl
        }
    });

    return {
        success: true,
        message: "",
        data: carts
    };
};

module.exports = {
    addProductToCart,
    getCartItems
}