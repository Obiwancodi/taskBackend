'use strict';

const models = require('./models');
module.exports.hello = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false; 
  models.db.sync({force:true})
  .then((test) => {
    return models.User.create({
      username: event.username,
      email: event.email,
      userID: event.userID,
      password: event.password
    })
  })
  .then((user) => {
    callback(null, user);
  })
  .catch((err) => {
    callback(err)
  })
};
