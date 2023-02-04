const jwt = require('jsonwebtoken');
require('dotenv').config();

/** @type { import("express").RequestHandler} */
const authorize = (req, res, next) => {
    const authHeader = req.get('Authorization') || "bearer xx";
    const token = authHeader.replace('Bearer', "").trimStart();

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error(err);
            res.status(401).json({ message: 'Invalid or expired token' });
            return;
        }
        
        next();
    });
};

module.exports = {
    authorize
}