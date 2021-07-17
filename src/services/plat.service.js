const Plat = require('../models/Plat.model');
const { GetService } = require('./get.service');

async function readAllPlatService(params) {
  const filters = {};
  const { page, limit, nom, ets, menu, promo, dispo } = params.query;
  const query = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const regrex = { $regex: nom || '', $options: 'i' };

  if (nom) {
    filters.$or = [{ nom: regrex }, { 'ets.nom': regrex }];
  }

  if (ets) {
    filters['ets._id'] = ets;
  }

  if (params.user.role === 1) {
    filters['ets._id'] = params.user.ets;
  }

  if (promo) {
    filters.promo = promo;
  }

  if (dispo) {
    filters.dispo = dispo;
  }

  if (menu) {
    filters.menu = menu;
  }

  console.log(filters);

  return await new GetService(
    Plat.find().populate('menu').populate('ets._id'),
    query,
    filters
  ).pagination();
}

module.exports = { readAllPlatService };
