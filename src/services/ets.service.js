const { GetService } = require('./get.service');
const Ets = require('../models/Ets.model');
const Menu = require('../models/Menu.model');
const Plat = require('../models/Plat.model');

async function disableAnable(params) {
  const ets = await Ets.findOne({ _id: params }).exec();
  await Ets.updateOne({ _id: params }, { $set: { disable: !ets.disable } });
  await Menu.updateMany({ ets: params }, { $set: { disable: !ets.disable } });
  await Plat.updateMany(
    { 'ets._id': params },
    { $set: { disable: !ets.disable } }
  );
  return true;
}

async function readAllEtsService(params) {
  const filters = {};
  const { page, limit, nom, type, disable } = params;
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

  if (disable) {
    filters.disable = disable;
  }

  return await new GetService(
    Ets.find().populate('type'),
    query,
    filters
  ).pagination();
}

module.exports = {
  readAllEtsService,
  disableAnable,
};
