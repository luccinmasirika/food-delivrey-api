const { GetService } = require('./get.service');
const { Menu, Category } = require('../models/Menu.model');
const Plat = require('../models/Plat.model');
const AppHttpError = require('../_helpers/appHttpError');

async function disableAnable(params) {
  const menu = await Menu.findOne({ _id: params }).exec();
  if (menu.ets.disable) {
    await Menu.updateOne({ _id: params }, { $set: { disable: !menu.disable } });
    await Plat.updateMany(
      { menu: params },
      { $set: { disable: !ets.disable } }
    );
    return true;
  }
  throw new AppHttpError('Denied ! Establisment is disabled', 400);
}

async function readAllMenuService(params) {
  const filters = {  };
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

async function readAllCatService(params) {
  const filters = {};
  const { page, limit } = params.query;
  const query = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  return await new GetService(Category.find(), query, filters).pagination();
}

module.exports = {
  readAllMenuService,
  disableAnable,
  readAllCatService,
};
