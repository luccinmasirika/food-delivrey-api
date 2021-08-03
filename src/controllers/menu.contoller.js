const Menu = require('../models/Menu.model');
const Ets = require('../models/Ets.model');
const AppHttpError = require('../_helpers/appHttpError');
const { ServiceCreate } = require('../services/create.service');
const { ServiceUpdate } = require('../services/update.service');
const {
  readAllMenuService,
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
  const menu = await Menu.findOne({ _id: req.query._id }, { ets: 1 });
  try {
    if (req.body.ets) {
      await new PushData(Ets, { menu: menu._id }, { _id: menu.ets }).onPull();
      await new PushData(
        Ets,
        { menu: menu._id },
        { _id: req.body.ets }
      ).onPush();
    }
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
