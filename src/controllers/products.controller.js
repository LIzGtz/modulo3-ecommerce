const productsService = require('../services/products.service');

/** @type { import("express").RequestHandler} */
const createProduct = async (req, res) => {
    const { name, price, availableQty, imageUrl } = req.body;
    const user = req.user;
    
    const result = await productsService.create({
        name,
        price,
        availableQty,
        imageUrl,
        userId: user.id
    });

    if (result.success) {
        res.status(201).end();
        return;
    }

    res.status(400).json({ message: result.message });
};

module.exports = {
    createProduct
};