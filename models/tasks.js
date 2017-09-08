const Sequelize = require('sequelize');
const db = require('./_db');

const Task = db.define('tasks', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT
	},
	dueDate: {
		type: Sequelize.DATE,
		allowNull: false
	},
	points: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	completed: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	failed: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	bySelf: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	}
});

module.exports = Task;