'use strict';

const models = require('./models');
module.exports.hello = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false; 
  models.db.sync({force:true})
  .then((test) => {
    return models.Streak.create({
      title: event.title,
      description: event.description,
      points: event.points,
      counter: event.counter
    })
  })
  .then((streak) => {
    return streak.finished()
  })
  .then((streak) => {
    return models.Streak.findOne({
      where:{
        id: 1
      }
    })
  })
  .then((streak) => {
    callback(null, streak)
  })
  .catch((err) => {
    callback(err)
  })
};
