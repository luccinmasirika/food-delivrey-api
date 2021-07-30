const Ets = require('../models/Ets.model');
const Type = require('../models/Type.model');
const AppHttpError = require('../_helpers/appHttpError');
const { ServiceCreate } = require('../services/create.service');
const { readAllEtsService } = require('../services/ets.service');
const { GetService } = require('../services/get.service');
const { PushData } = require('../_helpers/pushData');

async function constrollorCreateService(req, res, next) {
  try {
    const check = await Ets.findOne({ nom: req.body.nom });
    if (check) return next(new AppHttpError('Ce nom déjà pris', 400));
    const image = req.file ? `images/${req.file.filename}` : 'images/ets.png';
    const data = {
      ...req.body,
      image,
      heure: { ouverture: req.body.ouverture, fermeture: req.body.fermeture },
      localisation: { long: req.body.long, lat: req.body.lat },
    };
    const response = new ServiceCreate(data, Ets);
    const ets = await response.create();

    await new PushData(Type, { ets: ets._id }, { _id: req.body.type }).onPush();

    res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    next(new AppHttpError('Une error est survenue' + error, 500));
  }
}

async function readAllEts(req, res, next) {
  try {
    const ets = await readAllEtsService(req.query);
    if (!ets.total) return next(new AppHttpError("Pas d'établissement trouvé"));
    const myFilter = (el) => {
      return !el.type.disable;
    };

    res.json(ets);
  } catch (error) {
    next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

module.exports = { constrollorCreateService, readAllEts };
