const Menu = require('../models/Menu.model');
const AppHttpError = require('../_helpers/appHttpError');
const { ServiceCreate } = require('../services/create.service');
const { ServiceUpdate } = require('../services/update.service');
const {
  readAllMenuService,
  disableAnable,
} = require('../services/menu.service');

async function constrollorCreateService(req, res, next) {
  try {
    const image = req.file ? `images/${req.file.filename}` : 'images/menu.png';
    const data = { ...req.body, image };
    const response = new ServiceCreate(data, Menu);
    await response.create();
    res.json({ message: 'Success operation' });
  } catch (error) {
    next(new AppHttpError('An error has occurred' + error, 500));
  }
}

async function updateMenu(req, res, next) {
  try {
    const response = new ServiceUpdate(req, Menu);
    await response.update();
    return res.json({ message: 'Success operation' });
  } catch (error) {
    next(new AppHttpError('An error has occurred.' + ' ' + error.message, 500));
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

async function readAllMenu(req, res, next) {
  try {
    const menu = await readAllMenuService(req);
    res.json(menu);
  } catch (error) {
    next(new AppHttpError('An error has occurred.' + ' ' + error.message, 500));
  }
}

module.exports = {
  constrollorCreateService,
  readAllMenu,
  disableUnableControllor,
  updateMenu,
};
