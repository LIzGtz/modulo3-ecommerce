const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");

const Order = db.define('order', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    tableName: 'Orders'
});

const OrderItem = db.define('orderItem', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    tableName: 'OrderItems'
});

module.exports = {
    Order,
    OrderItem
};