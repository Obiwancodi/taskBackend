const Sequelize = require('sequelize');
const config = require('../config')
const db = new Sequelize(config.tableName, config.userName, config.password,{
    host: config.host,
    port: '5432',
    dialect: 'postgres',
    protocol: 'postgres',
    logging: console.log,
    dialectOptions: {
        ssl: 'Amazon RDS'
    }
});

module.exports = db;