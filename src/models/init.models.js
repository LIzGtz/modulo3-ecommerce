const { hash } = require("bcrypt");
const { db } = require("../utils/database")
const User = require("./user.model")

const initModels = async () => {
    // Define relationships here
    
    await db.sync();

    let adminUser = await User.findOne({
        where: {
            email: 'admin@example.org'
        }
    });

    if (adminUser == null) {
        const passwordHash = await hash(process.env.ADMIN_PASSWORD, 3);
        adminUser = await User.create({
            email: 'admin@example.org',
            firstName: 'Admin',
            lastName: 'User',
            password: passwordHash
        });
    }
};

module.exports = initModels;