const authService = require('../services/auth.service');

/** @type { import("express").RequestHandler} */
const registerUser = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    const result = await authService.register({
        email,
        firstName,
        lastName,
        password
    });

    if (result.success) {
        res.status(201).end();
        return;
    }

    res.status(400).json({ message: result.message });
}

module.exports = {
    registerUser
};