const Sequelize = require('sequelize');
const db = require('./_db');

const Reward = db.define('rewards', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT
	},
	points: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
});

module.exports = Reward;