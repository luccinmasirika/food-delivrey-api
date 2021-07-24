const Plat = require('../models/Plat.model');
const Ets = require('../models/Ets.model');
const AppHttpError = require('../_helpers/appHttpError');
const { ServiceCreate } = require('../services/create.service');
const { readAllPlatService } = require('../services/plat.service');

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
    await response.create();
    res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    next(new AppHttpError('Une error est survenue' + error, 500));
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
    next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

module.exports = { constrollorCreateService, readAllPlat };
