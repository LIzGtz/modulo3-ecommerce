const jwt = require('jsonwebtoken');
require('dotenv').config();

/** @type { import("express").RequestHandler} */
const authorize = (req, res, next) => {
    let { authorization: token } = req.headers;
    token = token.replace('Bearer', "").trimStart();

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error(err);
            res.status(401).json({ message: 'Invalid or expired token' });
            return;
        }

        console.log(decoded);
        next();
    });
};

module.exports = {
    authorize
}