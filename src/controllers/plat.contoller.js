const Plat = require('../models/Plat.model');
const Ets = require('../models/Ets.model');
const Menu = require('../models/Menu.model');
const AppHttpError = require('../_helpers/appHttpError');
const { ServiceCreate } = require('../services/create.service');
const {
  readAllPlatService,
  promo,
  disableAnable,
} = require('../services/plat.service');
const { ServiceUpdate } = require('../services/update.service');

async function constrollorCreateService(req, res, next) {
  try {
    const image = req.file ? `images/${req.file.filename}` : 'images/plat.png';
    const ets = await Ets.findById(req.body.ets);

    const data = { ...req.body, ets, image };
    const response = new ServiceCreate(data, Plat);
    const plat = await response.create();
    res.json({ message: 'Success operation', _id: plat._id });
  } catch (error) {
    next(new AppHttpError('An error has occurred' + error, 500));
  }
}

async function updatePlat(req, res, next) {
  try {
    const ets = await Ets.findById(req.body.ets);
    if (req.body.ets) {
      req.body.ets = ets;
    }
    const response = new ServiceUpdate(req, Plat);
    await response.update();
    return res.json({ message: 'Success operation' });
  } catch (error) {
    next(new AppHttpError('An error has occurred.' + ' ' + error.message, 500));
  }
}

async function addOtherImages(req, res, next) {
  try {
    const image = req.file && `images/${req.file.filename}`;
    const { _id } = req.query;

    await Plat.updateOne({ _id }, { $push: { autresImages: image } });
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
    next(new AppHttpError('An error has occurred.' + ' ' + error.message, 500));
  }
}

async function readAllPlat(req, res, next) {
  try {
    const plat = await readAllPlatService(req);
    res.json(plat);
  } catch (error) {
    next(new AppHttpError('An error has occurred.' + ' ' + error.message, 500));
  }
}

async function readRandomPlat(req, res, next) {
  const size = parseInt(req.query.count);
  try {
    const data = await Plat.aggregate([{ $sample: { size } }]);
    res.json({ data });
  } catch (error) {
    next(new AppHttpError('An error has occurred.' + ' ' + error.message, 500));
  }
}

module.exports = {
  constrollorCreateService,
  readAllPlat,
  addOtherImages,
  promoControllor,
  disableUnableControllor,
  updatePlat,
  readRandomPlat,
};
