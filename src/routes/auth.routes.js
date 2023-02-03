const { Router } = require("express");
const controller = require("../controllers/auth.controller");

// User management routes
const router = Router();

// POST /api/v1/auth/register
router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);

module.exports = router;