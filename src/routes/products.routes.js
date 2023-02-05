const { Router } = require("express");
const controller = require('../controllers/products.controller');
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post('/', authMiddleware.authorize, controller.createProduct);
router.get('/in-existence', authMiddleware.authorize, controller.getProductsInExistence);

module.exports = router;