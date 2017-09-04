const Sequelize = require('sequelize');
const db = new Sequelize('taskdb','Administrator', 'JorgeLopez67.',{
    host: 'taskdb.cpw46tuovq7f.us-east-2.rds.amazonaws.com',
    port: '5432',
    dialect: 'postgres',
    protocol: 'postgres',
    logging: console.log,
    dialectOptions: {
        ssl: 'Amazon RDS'
    }
});

module.exports = db;