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

/** @type { import("express").RequestHandler} */
const getProductsInExistence = async (req, res) => {
    const result = await productsService.getProductsInExistence();

    if (result.success) {
        res.status(200).json(result.data);
        return;
    }

    res.status(400).json({ message: result.message });
}

module.exports = {
    createProduct,
    getProductsInExistence
};