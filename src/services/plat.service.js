const Plat = require('../models/Plat.model');
const { GetService } = require('./get.service');
const AppHttpError = require('../_helpers/appHttpError');

async function disableAnable(params) {
  const plat = await Plat.findOne({ _id: params })
    .populate({
      path: 'menu',
      select: 'disable',
    })
    .populate({
      path: 'ets._id',
      select: 'disable',
    })
    .exec();

  if (plat.ets._id.disable) {
    throw new AppHttpError('Denied ! Establisment is disabled', 400);
  }
  if (plat.menu.disable) {
    throw new AppHttpError('Denied ! Menu is disabled', 400);
  }
  await Plat.updateOne({ _id: params }, { $set: { disable: !plat.disable } });
  return true;
}

async function promo(params) {
  const plat = await Plat.findOne({ _id: params }).exec();
  await Plat.updateOne({ _id: params }, { $set: { promo: !plat.promo } });
  return true;
}

async function readAllPlatService(params) {
  const filters = {};
  const { page, limit, nom, ets, menu, promo, disable } = params.query;
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

  if (disable) {
    filters.disable = disable;
  }

  if (menu) {
    filters.menu = menu;
  }

  return await new GetService(
    Plat.find().populate('menu').populate('ets._id'),
    query,
    filters
  ).pagination();
}

module.exports = { readAllPlatService, disableAnable, promo };
