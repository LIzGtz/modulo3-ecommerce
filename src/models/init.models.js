const { hash } = require("bcrypt");
const { db } = require("../utils/database");
const { Cart, CartItem } = require("./cart.model");
const { Order, OrderItem } = require("./order.model");
const Product = require("./product.model");
const User = require("./user.model")
const AuthService = require('../services/auth.service');

const initModels = async () => {
    // Define relationships here
    User.hasMany(Product, {
        foreignKey: {
            allowNull: false
        }
    });
    Product.belongsTo(User);

    User.hasOne(Cart, {
        foreignKey: {
            allowNull: false,
            unique: true
        }
    });
    Cart.belongsTo(User);

    Cart.hasMany(CartItem, {
        foreignKey: {
            allowNull: false
        }
    });
    CartItem.belongsTo(Cart);

    Product.hasMany(CartItem, {
        foreignKey: {
            allowNull: false
        }
    });
    CartItem.belongsTo(Product);

    User.hasMany(Order, {
        foreignKey: {
            allowNull: false
        }
    });
    Order.belongsTo(User);

    Order.hasMany(OrderItem, {
        foreignKey: {
            allowNull: false
        }
    });
    OrderItem.belongsTo(Order);

    OrderItem.belongsTo(Product, {
        foreignKey: {
            allowNull: false
        }
    });
    
    await db.sync({ force: false });

    AuthService.register({
        email: 'admin@example.org',
        password: process.env.ADMIN_PASSWORD,
        userName: 'admin'
    });
};

module.exports = initModels;