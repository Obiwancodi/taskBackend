'use strict';
const Promise = require("bluebird");
const models = require('./models');

// Reset the datbase!

module.exports.reset = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.db.sync({force:true})
  .then((reset) => {
    callback(null, 200)
  })
  .catch((err) => {
    callback(err)
  })
}

// Users Endpoints!

module.exports.getUsers = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.User.findAll({})
  .then((users) => {
    callback(null,users)
  })
  .catch((err) => {
    callback(err)
  })
};

module.exports.getUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.User.findOne({
    where: {
      id: event.id
    },
    include: [{all:true}]
  })
  .then((user) => {
    callback(null,user)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.createUser = (event,context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
    models.User.create({
      username: event.username,
      email: event.email,
      password: event.password

    })
  .then((user) => {
    callback(null, 200)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.updateUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.User.update(event, {
    where: {
      userID: event.id
    }
  })
  .then((user) => {
    callback(null, 200)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.deleteUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.User.destroy({
    where: {
      userID: event.id
    }
  })
  .then((user) => {
    callback(null, 202)
  })
  .catch((err) => {
    callback(err)
  })
}

// Reward Enpoints!

module.exports.getReward = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.Reward.findOne({
    where: {
      id: event.id
    }
  })
  .then((reward) => {
    callback(null, reward)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.createReward = (event,context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.Reward.create({
    title: event.title,
    description: event.description,
    points: event.points
  })
  .then((reward) => {
    callback(null, 200)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.updateReward = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.Reward.update(event,{
    where: {
      id: event.id
    }
  })
  .then((reward) => {
    callback(null, 200)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.deleteReward = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.Reward.destroy({
    where: {
      id: event.id
    }
  })
  .then((reward) => {
    callback(null, 200)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.turnInReward = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.Reward.findOne({where: {id: event.id} })
  .then((reward) => {
    return models.User.findOne({where: {id: event.userId}})
    .then((user) => {
      return reward.addUser(user)
    })
  })
  .then((reward) => {
    callback(null,reward);
  })
  .catch((err) => {
    callback(err)
  })
}

// Tasks Enpoints!

module.exports.getTask = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
    models.Task.findOne({
      where: {
        id: event.id
      },
      include: [{all: true}]
    })
    .then((task) => {
      callback(null, task)
    })
    .catch((err) => {
      callback(err)
    })
}

module.exports.createTask = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.Task.create({
    title: event.title,
    description: event.description,
    dueDate: event.dueDate,
    points: event.points
  })
  .then((task) => {
    return models.User.findOne({where: {id: event.userId}})
    .then((user) => {
      return task.setPerson(user)
    })
    .then((task) => {
      return models.User.findOne({where: {id: event.assignId}})
    }) 
    .then((user) => {
      return task.setAssigner(user)
    })
    .then((user) => {
      return models.Reward.findOne({where: {id: event.rewardId}})
    })
    .then((reward) => {
      return reward.addTask(task)
    })
    .then((streak) => {
      return models.Streak.findOne({where: {id:event.streakId}})
    })
    .then((streak) => {
      return task.setStreak(streak)
    })
 
  })
  .then((task) => {
    callback(null,200)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.updateTask = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.Task.update(event,{
    where: {
      id: event.id
    }
  })
  .then((task) => {
    callback(null, 200)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.deleteTask = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.Task.destroy({
    where: {
      id: event.id
    }
  })
  .then((task) => {
    callback(null, 200)
  })
  .catch((err) => {
    callback(err)
  })
}

// Streak Tasks Endpoints!

module.exports.getStreak = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.Streak.findOne({
    where: {
      id: event.id
    },
    include: [{all:true}]
  })
  .then((streak) => {
    callback(null, streak)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.createStreak = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.Streak.create({
    title: event.title,
    description: event.description,
    points: event.points,
    counter: event.counter
  })
  .then((streak) => {
    return models.User.findOne({where: {id: event.userId}})
    .then((user) => {
      return streak.setPersonstr(user)
    })
    .then((task) => {
      return models.User.findOne({where: {id: event.assignId}})
    }) 
    .then((user) => {
      return streak.setAssignerstr(user)
    })
    .then((user) => {
      return models.Reward.findOne({where: {id: event.rewardId}})
    })
    .then((reward) => {
      return reward.addStreak(streak);
    })
  })
  .then((streak) => {
    callback(null,200)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.updateStreak = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.Streak.update(event, {
    where: {
      id: event.id
    }
  })
  .then((streak) => {
    callback(null, 200)
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.deleteStreak = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  models.Streak.destroy({
    where: {
      id: event.id
    }
  })
  .then((streak) => {
    callback(null,200)
  })
  .catch((err) => {
    callback(err)
  })
}
