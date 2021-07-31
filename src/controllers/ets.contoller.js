const Ets = require('../models/Ets.model');
const Type = require('../models/Type.model');
const AppHttpError = require('../_helpers/appHttpError');
const { ServiceCreate } = require('../services/create.service');
const { ServiceUpdate } = require('../services/update.service');
const { readAllEtsService, disableAnable } = require('../services/ets.service');
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

async function updateEts(req, res, next) {
  const ets = await Ets.findOne(
    { _id: req.query._id },
    { heure: 1, localisation: 1 }
  );

  req.body.heure = {
    ouverture: req.body.ouverture || ets.heure.ouverture,
    fermeture: req.body.fermeture || ets.heure.fermeture,
  };

  req.body.localisation = {
    long: req.body.long || ets.localisation.long,
    lat: req.body.lat || ets.localisation.lat,
  };

  req.body.ouverture && delete req.body.ouverture;
  req.body.fermeture && delete req.body.fermeture;
  req.body.long && delete req.body.long;
  req.body.lat && delete req.body.lat;

  try {
    const response = new ServiceUpdate(req, Ets);
    await response.update();
    return res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

async function disableUnableControllor(req, res, next) {
  try {
    await disableAnable(req.query._id);
    return res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    next(new AppHttpError('Une erreur est survenue' + error, 500));
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

module.exports = {
  constrollorCreateService,
  readAllEts,
  updateEts,
  disableUnableControllor,
};
