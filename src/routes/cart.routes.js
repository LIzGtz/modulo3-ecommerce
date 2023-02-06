const { Router } = require("express");
const controller = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.post('/', authMiddleware.authorize, controller.addToCart);
router.get('/', authMiddleware.authorize, controller.getCartItems);

module.exports = router;