const dotenv = require('dotenv');
dotenv.config();

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * User data
 * @typedef {Object} NewUserData
 * @property {string} email - User Email
 * @property {string} firstName - User first name
 * @property {string} lastName - User last name
 * @property {string} password - User password
 */

/**
 * Operation Result
 * @typedef {Object} Result
 * @property {boolean} success - Operation result
 * @property {string} message - Result message
 * @property {*} data - Optional additional data
 */

/**
 * Creates a new user
 * @param {NewUserData} userData 
 * @returns {Promise<Result>} The operation result
 */
const register = async (userData) => {
    /* let userInfo = {
        email: 'test@example.org',
        firstName: 'Panchito',
        lastName: 'Gonzalez',
        password: '123'
    } */
    // createUser(userInfo)
    let existingUser = await User.findOne({
        where: {
            email: userData.email
        }
    });

    if (existingUser == null) {
        const passwordHash = await bcrypt.hash(userData.password, parseInt(process.env.SALT_HOOPS));
        userData.password = passwordHash;

        existingUser = await User.create(userData);

        return {
            success: true,
            message: "",
            data: {
                id: existingUser.id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email
            }
        };
    }

    return {
        success: false,
        message: "User already exists."
    };
}

/**
 * User credentials
 * @typedef {Object} UserCredentials
 * @property {string} email - User Email
 * @property {string} password - User password
 */

/**
 * Logins a user with the supplied credentials
 * @param {UserCredentials} userCredentials 
 * @returns {Promise<Result>} The operation result with the JWT token if successful
 */
const login = async (userCredentials) => {
    const user = await User.findOne({ where: { email: userCredentials.email }});

    if (user == null) {
        return {
            success: false,
            message: 'Invalid credentials'
        };
    }

    const isValidPassword = await bcrypt.compare(userCredentials.password, user.password);
    if (!isValidPassword) {
        return {
            success: false,
            message: 'Invalid credentials'
        };
    }

    const userData = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    };
    const userToken = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: "10m",
        algorithm: "HS512"
    });

    return {
        success: true,
        message: "",
        data: {
            token: userToken
        }
    };
}

module.exports = {
    register,
    login
};