const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres'
});

const testConnection = async (sequelize) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return true;
    } catch (err) {
        console.error('Unable to connect to database: ', err);
        return false;
    }
};

module.exports = {
    db,
    testConnection
};