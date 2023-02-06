const cartService = require('../services/cart.service');

/** @type { import("express").RequestHandler } */
const addToCart = async (req, res) => {
    const { productId } = req.body;
    const user = req.user;

    const result = await cartService.addProductToCart({
        productId,
        userId: user.id
    });

    if (result.success) {
        res.status(201).end();
        return;
    }

    res.status(400).json({ message: result.message });
};

module.exports = {
    addToCart
}