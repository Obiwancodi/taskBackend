const db = require('./_db');
const user =require('./users');
const task = require('./tasks');
const reward = require('./rewards');
const streak = require('./streaks');



module.exports = {
  db: db,
  User: user,
  Task: task,
  Reward: reward,
  Streak: streak
};