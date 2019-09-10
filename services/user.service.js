const userModel = require('../models/user.model');

const findAll = () => {
  return userModel.findAll();
};

module.exports = {
  findAll,
};
