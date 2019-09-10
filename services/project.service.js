const projectModel = require('../models/project.model');

const findAll = () => {
  return projectModel.findAll();
};

const findById = async (id) => {
  return await projectModel.findById(id);
};


module.exports = {
  findAll,
  findById,
};
