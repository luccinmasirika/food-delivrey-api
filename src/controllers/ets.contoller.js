const Ets = require('../models/Ets.model');
const AppHttpError = require('../_helpers/appHttpError');
const { ServiceCreate } = require('../services/create.service');
const { readAllEtsService } = require('../services/ets.service');
const { GetService } = require('../services/get.service');

async function constrollorCreateService(req, res, next) {
  try {
    const image = req.file ? `/images/${req.file.filename}` : '/images/ets.png';
    const data = { ...req.body, image };
    const response = new ServiceCreate(data, Ets);
    await response.create();
    res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    next(new AppHttpError('Une error est survenue' + error, 500));
  }
}

async function readAllEts(req, res, next) {
  try {
    const ets = await readAllEtsService(req.query);
    if (!ets.total) return next(new AppHttpError("Pas d'établissement trouvé"));
    res.json(ets);
  } catch (error) {
    next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

module.exports = { constrollorCreateService, readAllEts };
