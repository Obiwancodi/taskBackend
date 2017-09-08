const Sequelize = require('sequelize');
const db = require('./_db');

const Streak = db.define('streaks', {
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
		},
		completed: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		failed: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		counter: {
			type: Sequelize.INTEGER
		},
	},
	{
	instanceMethods: {
		subtract: function() {
			return Streak.update({
				counter: this.counter - 1
			},
			{
				where: {
					id: this.id
				}
			})
		},
		finished: function() {
			if(this.counter <= 0){
				return Streak.update({
					completed: true
				},
				{
					where: {
						id: this.id
					}
				})
			}
			else {
				return "false"
			}
		}
	}

});



module.exports = Streak;