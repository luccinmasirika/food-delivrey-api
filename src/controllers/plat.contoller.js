const Plat = require('../models/Plat.model');
const Ets = require('../models/Ets.model');
const { Menu } = require('../models/Menu.model');
const AppHttpError = require('../_helpers/appHttpError');
const { ServiceCreate } = require('../services/create.service');
const {
  readAllPlatService,
  promo,
  disableAnable,
} = require('../services/plat.service');
const { PushData } = require('../_helpers/pushData');

async function constrollorCreateService(req, res, next) {
  try {
    const image = req.file ? `images/${req.file.filename}` : 'images/plat.png';
    const checkEts = await Ets.findById(req.body.ets);
    const ets = {
      _id: checkEts._id,
      nom: checkEts.nom,
    };
    const data = { ...req.body, ets, image };
    const response = new ServiceCreate(data, Plat);
    const pushData = await response.create();
    await new PushData(
      Menu,
      { plat: pushData._id },
      { _id: req.body.menu }
    ).onPush();
    res.json({ message: 'Success operation', _id: pushData._id });
  } catch (error) {
    next(new AppHttpError('Une error est survenue' + error, 500));
  }
}

async function addOtherImages(req, res, next) {
  try {
    const image = req.file && `images/${req.file.filename}`;
    const { _id } = req.query;

    const test = await Plat.updateOne(
      { _id },
      { $push: { autresImages: image } }
    );
    return res.json({ message: 'Success operation' });
  } catch (error) {
    next(new AppHttpError('An error has occurred', 500));
  }
}

async function promoControllor(req, res, next) {
  try {
    await promo(req.query._id);
    return res.json({ message: 'Success operation' });
  } catch (error) {
    next(new AppHttpError('An error has occurred', 500));
  }
}

async function disableUnableControllor(req, res, next) {
  try {
    await disableAnable(req.query._id);
    return res.json({ message: 'Success operation' });
  } catch (error) {
    next(new AppHttpError('An error has occurred' + error, 500));
  }
}

async function readAllPlat(req, res, next) {
  try {
    const plat = await readAllPlatService(req);
    if (!plat.total) {
      return next(new AppHttpError('Pas de plat touvé', 400));
    }
    res.json(plat);
  } catch (error) {
    next(new AppHttpError('An error has occurred' + error, 500));
  }
}

module.exports = {
  constrollorCreateService,
  readAllPlat,
  addOtherImages,
  promoControllor,
  disableUnableControllor,
};
