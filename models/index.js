const db = require('./_db');
const User =require('./users');
const Task = require('./tasks');
const Reward = require('./rewards');
const Streak = require('./streaks');

Task.belongsTo(User,{as: "goalDoer"});
Task.belongsTo(User,{as: "assigner"});


module.exports = {
  db: db,
  User: User,
  Task: Task,
  Reward: Reward,
  Streak: Streak
};