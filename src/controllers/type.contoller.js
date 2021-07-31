const Type = require('../models/Type.model');
const AppHttpError = require('../_helpers/appHttpError');
const { ServiceCreate } = require('../services/create.service');
const { ServiceUpdate } = require('../services/update.service');
const { readAllTypeService } = require('../services/type.service');

async function constrollorCreateService(req, res, next) {
  try {
    const check = await Type.findOne({ nom: req.body.nom });
    if (check) return next(new AppHttpError('Ce nom déjà pris', 400));
    const image = req.file ? `images/${req.file.filename}` : 'images/type.png';
    const data = { ...req.body, image };
    const response = new ServiceCreate(data, Type);
    await response.create();
    res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    next(new AppHttpError('Une error est survenue' + error, 500));
  }
}

async function updateType(req, res, next) {
  try {
    const response = new ServiceUpdate(req, Type);
    await response.update();
    return res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

async function readAllType(req, res, next) {
  try {
    const type = await readAllTypeService(req);
    if (!type.total) {
      return next(new AppHttpError('Pas de type touvé', 400));
    }
    res.json(type);
  } catch (error) {
    next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

module.exports = { constrollorCreateService, readAllType, updateType };
