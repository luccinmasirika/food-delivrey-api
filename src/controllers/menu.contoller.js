const { Menu, Category } = require('../models/Menu.model');
const Ets = require('../models/Ets.model');
const AppHttpError = require('../_helpers/appHttpError');
const { ServiceCreate } = require('../services/create.service');
const { ServiceUpdate } = require('../services/update.service');
const {
  readAllMenuService,
  readAllCatService,
  disableAnable,
} = require('../services/menu.service');
const { PushData } = require('../_helpers/pushData');

async function constrollorCreateService(req, res, next) {
  try {
    const image = req.file ? `images/${req.file.filename}` : 'images/menu.png';
    const data = { ...req.body, image };
    const response = new ServiceCreate(data, Menu);
    const menu = await response.create();

    await new PushData(Ets, { menu: menu._id }, { _id: req.body.ets }).onPush();

    res.json({ message: 'Success operation' });
  } catch (error) {
    next(new AppHttpError('Une error est survenue' + error, 500));
  }
}

async function updateMenu(req, res, next) {
  try {
    const response = new ServiceUpdate(req, Menu);
    await response.update();
    return res.json({ message: 'Success operation' });
  } catch (error) {
    next(new AppHttpError('An error has occurred' + error, 500));
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

async function constrollorCreateCategoryService(req, res, next) {
  try {
    const response = new ServiceCreate(req.body, Category);
    await response.create();
    res.json({ message: 'Success operation' });
  } catch (error) {
    next(new AppHttpError('An error has occurred' + error, 500));
  }
}

async function readAllMenu(req, res, next) {
  try {
    const menu = await readAllMenuService(req);
    if (!menu.total) {
      return next(new AppHttpError('Pas de menu trouvé', 400));
    }
    res.json(menu);
  } catch (error) {
    next(new AppHttpError('An error has occurred' + error, 500));
  }
}

async function readAllCat(req, res, next) {
  try {
    const cat = await readAllCatService(req);
    if (!cat.total) {
      return next(new AppHttpError('Pas de catégorie trouvé', 400));
    }
    res.json(cat);
  } catch (error) {
    next(new AppHttpError('An error has occurred' + error, 500));
  }
}
module.exports = {
  constrollorCreateService,
  constrollorCreateCategoryService,
  readAllMenu,
  readAllCat,
  disableUnableControllor,
  updateMenu,
};
