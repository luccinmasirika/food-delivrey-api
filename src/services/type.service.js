const { GetService } = require('./get.service');
const Type = require('../models/Type.model');

async function readAllTypeService(params) {
  const filters = {};
  const { page, limit } = params.query;
  const query = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  return await new GetService(Type.find(), query, filters).pagination();
}

module.exports = {
  readAllTypeService,
};
