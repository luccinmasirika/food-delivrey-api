const { GetService } = require('./get.service');
const Menu = require('../models/Menu.model');
const Ets = require('../models/Ets.model');
const Plat = require('../models/Plat.model');
const AppHttpError = require('../_helpers/appHttpError');

async function disableAnable(params) {
  const menu = await Menu.findOne({ _id: params }).exec();
  const ets = await Ets.findOne({ _id: menu.ets }, { disable: 1 }).exec();

  if (ets.disable) {
    throw new AppHttpError('Establisment must be active', 400);
  }
  await Menu.updateOne({ _id: params }, { $set: { disable: !menu.disable } });
  await Plat.updateMany({ menu: params }, { $set: { disable: !menu.disable } });
  return true;
}

async function readAllMenuService(params) {
  const filters = {};
  const { page, limit, nom, ets, disable } = params.query;
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

  if (disable) {
    filters.disable = disable;
  }

  return await new GetService(
    Menu.find().populate('category').populate('ets'),
    query,
    filters
  ).pagination();
}

module.exports = {
  readAllMenuService,
  disableAnable,
};
