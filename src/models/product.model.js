const { DataTypes } = require('sequelize');
const { db } = require('./../utils/database');
const User = require('./user.model');

const Product = db.define('product', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    availableQty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    tableName: 'Products'
});

module.exports = Product;