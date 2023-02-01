const { DataTypes } = require('sequelize');
const { db } = require('./../utils/database');

const User = db.define('User', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    lastName: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'Users'
});

module.exports = User;