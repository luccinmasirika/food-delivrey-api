const AppHttpError = require('../_helpers/appHttpError');
const {
  readAllDeviseService,
  serviceConfigUpdate,
  serviceDeviseUpdate,
  serviceDeviseCreate,
  serviceReadConfig,
} = require('../services/config.service');
const { ServiceCreate } = require('../services/create.service');
const { ServiceUpdate } = require('../services/update.service');

async function updateConfig(req, res, next) {
  try {
    await serviceConfigUpdate(req.body);
    return res.json({ message: 'Success operation' });
  } catch (error) {
    return next(
      new AppHttpError('An error has occurred.' + ' ' + error.message, 500)
    );
  }
}

async function createDevise(req, res, next) {
  try {
    const response = new ServiceCreate(req.body, Devise);
    await response.create();
    return res.json({ message: 'Success operation' });
  } catch (error) {
    return next(
      new AppHttpError('An error has occurred.' + ' ' + error.message, 500)
    );
  }
}

async function updateDevise(req, res, next) {
  try {
    const response = new ServiceUpdate(req, Ets);
    await response.update();
    return res.json({ message: 'Success operation' });
  } catch (error) {
    return next(
      new AppHttpError('An error has occurred.' + ' ' + error.message, 500)
    );
  }
}

async function updateLogo(req, res, next) {
  try {
    const logo = `images/${req.file.filename}`;
    await serviceConfigUpdate({ logo });
    return res.json({ message: 'Success operation' });
  } catch (error) {
    return next(
      new AppHttpError('An error has occurred.' + ' ' + error.message, 500)
    );
  }
}

async function updateIcon(req, res, next) {
  try {
    const icon = `images/${req.file.filename}`;
    await serviceConfigUpdate({ icon });
    return res.json({ message: 'Success operation' });
  } catch (error) {
    return next(
      new AppHttpError('An error has occurred.' + ' ' + error.message, 500)
    );
  }
}

async function readConfig(req, res, next) {
  try {
    const config = await serviceReadConfig();
    res.json(config);
  } catch (error) {
    next(new AppHttpError('Il y a une erreur', 500));
  }
}

async function readAllDevise(req, res, next) {
  try {
    const devise = await readAllDeviseService();
    res.json(devise);
  } catch (error) {
    next(new AppHttpError('An error has occurred.' + ' ' + error.message, 500));
  }
}

module.exports = {
  updateConfig,
  updateIcon,
  updateLogo,
  readAllDevise,
  updateDevise,
  createDevise,
  readConfig,
};
