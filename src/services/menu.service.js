const { GetService } = require('./get.service');
const { Menu, Category } = require('../models/Menu.model');

async function readAllMenuService(params) {
  const filters = {};
  const { page, limit, nom, ets, category } = params.query;
  const query = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  if (nom) {
    filters.nom = { $regex: nom || '', $options: 'i' };
  }

  if (ets) {
    filters.ets = ets;
  }

  if (params.user.role === 1) {
    filters.ets = params.user.ets;
  }

  if (category) {
    filters.category = category;
  }

  return await new GetService(
    Menu.find().populate('category').populate('ets'),
    query,
    filters
  ).pagination();
}

module.exports = {
  readAllMenuService,
};
