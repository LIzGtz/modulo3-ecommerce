const User = require("../models/user.model")
const { hash } = require("bcrypt");

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
        const passwordHash = await hash(userData.password, parseInt(process.env.SALT_HOOPS));
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

module.exports = {
    register
};