const { Menu, Category } = require('../models/Menu.model');
const AppHttpError = require('../_helpers/appHttpError');
const { ServiceCreate } = require('../services/create.service');
const { readAllMenuService } = require('../services/menu.service');

async function constrollorCreateService(req, res, next) {
  try {
    const image = req.file
      ? `/images/${req.file.filename}`
      : '/images/menu.png';
    const data = { ...req.body, image };
    const response = new ServiceCreate(data, Menu);
    await response.create();
    res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    next(new AppHttpError('Une error est survenue' + error, 500));
  }
}

async function constrollorCreateCategoryService(req, res, next) {
  try {
    const response = new ServiceCreate(req.body, Category);
    await response.create();
    res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

async function readAllMenu(req, res, next) {
  try {
    const menu = await readAllMenuService(req);
    if(!manu.total){
      return next(new AppHttpError('Pas de menu trouvé', 400))
    }
    res.json(menu);
  } catch (error) {
    next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

module.exports = {
  constrollorCreateService,
  constrollorCreateCategoryService,
  readAllMenu,
};
