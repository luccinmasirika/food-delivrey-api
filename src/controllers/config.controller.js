const AppHttpError = require('../_helpers/appHttpError');
const {
  readAllDeviseService,
  serviceConfigUpdate,
  serviceDeviseUpdate,
  serviceDeviseCreate,
} = require('../services/config.service');

async function updateConfig(req, res, next) {
  try {
    await serviceConfigUpdate(req.body);
    return res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    return next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

async function createDevise(req, res, next) {
  try {
    await serviceDeviseCreate(req.body);
    return res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    return next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

async function updateDevise(req, res, next) {
  try {
    await serviceDeviseUpdate(req.body, req.devise._id);
    return res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    return next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

async function updateLogo(req, res, next) {
  try {
    const logo = `images/${req.file.filename}`;
    await serviceConfigUpdate({ logo });
    return res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    return next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

async function updateIcon(req, res, next) {
  try {
    const icon = `images/${req.file.filename}`;
    await serviceConfigUpdate({ icon });
    return res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    return next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

async function readAllDevise(req, res, next) {
  try {
    const devise = await readAllDeviseService();
    if (!devise.total)
      return next(new AppHttpError("Pas d'établissement trouvé"));
    res.json(devise);
  } catch (error) {
    next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

module.exports = {
  updateConfig,
  updateIcon,
  updateLogo,
  readAllDevise,
  updateDevise,
  createDevise,
};
