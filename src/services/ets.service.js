const { GetService } = require('./get.service');
const Ets = require('../models/Ets.model');

async function readAllEtsService(params) {
  const filters = { role: 3 };
  const { page, limit, nom, type } = params;
  const query = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  if (nom) {
    filters.nom = { $regex: nom || '', $options: 'i' };
  }

  if (type) {
    filters.type = type;
  }

  return await new GetService(Ets.find(), query, filters).pagination();
}

module.exports = {
  readAllEtsService,
};
