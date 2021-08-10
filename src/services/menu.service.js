const { GetService } = require('./get.service');
const Menu = require('../models/Menu.model');
const Plat = require('../models/Plat.model');

async function disableAnable(params) {
  const menu = await Menu.findOne({ _id: params }).exec();
  await Menu.updateOne({ _id: params }, { $set: { disable: !menu.disable } });
  await Plat.updateMany({ menu: params }, { $set: { disable: !menu.disable } });
  return true;
}

async function readAllMenuService(params) {
  const filters = {};
  const { page, limit, nom, disable } = params.query;
  const query = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  if (nom) {
    filters.nom = { $regex: nom || '', $options: 'i' };
  }

  if (disable) {
    filters.disable = disable;
  }

  return await new GetService(
    Menu.find(),
    query,
    filters
  ).pagination();
}

module.exports = {
  readAllMenuService,
  disableAnable,
};
