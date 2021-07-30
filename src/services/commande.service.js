const Commande = require('../models/Commande.model');
const { GetService } = require('./get.service');

async function readAllCommandeService(params) {
  const filters = {};
  const { page, limit, startDate, endDate, etat, ets } = params.query;
  const query = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  if (startDate || endDate) {
    filters['createdAt'] = {
      $gte: startDate,
      $lt: endDate,
    };
  }

  if (ets) {
    filters.ets = ets;
  }

  if (params.user.role === 1) {
    filters.ets = params.user.ets;
  }

  if (params.user.role === 3) {
    filters.client = params.user._id;
  }

  if (etat) {
    filters.etat = etat;
  }

  return await new GetService(
    Commande.find().populate('client').populate('produit').populate('ets'),
    query,
    filters
  ).pagination();
}

module.exports = { readAllCommandeService };
