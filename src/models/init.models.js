const { hash } = require("bcrypt");
const { db } = require("../utils/database");
const Product = require("./product.model");
const User = require("./user.model")

const initModels = async () => {
    // Define relationships here
    User.hasMany(Product, {
        foreignKey: 'userId'
    });
    Product.belongsTo(User, {
        foreignKey: 'userId'
    });
    
    await db.sync({ force: false });

    let adminUser = await User.findOne({
        where: {
            email: 'admin@example.org'
        }
    });

    if (adminUser == null) {
        const passwordHash = await hash(process.env.ADMIN_PASSWORD, 3);
        adminUser = await User.create({
            email: 'admin@example.org',
            userName: 'admin',
            password: passwordHash
        });
    }
};

module.exports = initModels;