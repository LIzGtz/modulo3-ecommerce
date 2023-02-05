const authService = require('../services/auth.service');

/** @type { import("express").RequestHandler} */
const registerUser = async (req, res) => {
    const { email, userName, password } = req.body;

    const result = await authService.register({
        email,
        userName,
        password
    });

    if (result.success) {
        res.status(201).end();
        return;
    }

    res.status(400).json({ message: result.message });
}

/** @type { import("express").RequestHandler} */
const loginUser = async (req, res) => {
    const credentials = req.body;

    if (credentials == null) {
        res.status(400).json({ message: 'Invalid payload received.' });
        return;
    }

    if (credentials.email === undefined || (credentials.email.length || 0) === 0) {
        res.status(400).json({ message: 'Field {email} is requiered.' });
    }

    const result = await authService.login(credentials);

    if (result.success) {
        res.status(200).json({ token: result.data.token });
        return;
    }

    res.status(400).json({ message: result.message });
}

module.exports = {
    registerUser,
    loginUser
};