const { GetService } = require('./get.service');
const User = require('../models/User.model');

async function readAllLivreur(params) {
  const filters = { role: 2 };
  const { page, limit, nom, disable } = params;
  const query = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const regrex = { $regex: nom || '', $options: 'i' };

  if (nom) {
    filters.$or = [{ firstName: regrex }, { lastName: regrex }];
  }

  if (disable) {
    filters.disable = disable;
  }

  return new GetService(User.find(), query, filters).pagination();
}

module.exports = {
  readAllLivreur,
};
