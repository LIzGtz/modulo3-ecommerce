const cartService = require('../services/cart.service');

/** @type { import("express").RequestHandler } */
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const user = req.user;

    const result = await cartService.addProductToCart({
        productId,
        quantity,
        userId: user.id
    });

    if (result.success) {
        res.status(201).end();
        return;
    }

    res.status(400).json({ message: result.message });
};

/** @type { import("express").RequestHandler } */
const getCartItems = async (req, res) => {
    const user = req.user;

    const result = await cartService.getCartItems(user.id);

    if (result.success) {
        res.status(200).json(result.data);
        return;
    }

    res.status(400).json({ message: result.message });
}

module.exports = {
    addToCart,
    getCartItems
}