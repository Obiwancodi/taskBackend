const Sequelize = require('sequelize');
const config = require('../config')
const db = new Sequelize(config.tableName, config.userName, config.password,{
    host: 'taskdb.cpw46tuovq7f.us-east-2.rds.amazonaws.com',
    port: '5432',
    dialect: 'postgres',
    protocol: 'postgres',
    logging: console.log,
    dialectOptions: {
        ssl: 'Amazon RDS'
    },
    pool: {
	    max: 5,
	    min: 0,
	    idle: 20000,
	    acquire: 20000
    }
});

module.exports = db;