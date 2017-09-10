const db = require('./_db');
const User = require('./users');
const Task = require('./tasks');
const Reward = require('./rewards');
const Streak = require('./streaks');

Task.belongsTo(User,{as: "person"});
Task.belongsTo(User,{as: "assigner"});

Reward.belongsToMany(Task,{through: "rewardToTasks"});
Reward.belongsToMany(User,{through: "rewardToUsers"});


Task.belongsTo(Streak);


module.exports = {
  db: db,
  User: User,
  Task: Task,
  Reward: Reward,
  Streak: Streak
};