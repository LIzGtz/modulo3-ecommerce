const { DataTypes } = require('sequelize');
const { db } = require('./../utils/database');
const User = require('./user.model');

const Cart = db.define('cart', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'Carts'
});

const CartItem = db.define('cartItem', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
}, {
    tableName: 'CartItems'
});

module.exports = {
    Cart,
    CartItem
};