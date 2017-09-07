const Sequelize = require('sequelize');

const db = require('./_db');

const User = db.define('users', {
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	userID: {
		type: Sequelize.STRING
	},
	currentExp: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	totalExp: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
});

module.exports = User;