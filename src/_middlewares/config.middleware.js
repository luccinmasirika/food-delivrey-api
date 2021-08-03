const { Config, Devise } = require('../models/Config.model');
const AppHttpError = require('../_helpers/appHttpError');

// Get config by ID from params
async function getConfigByID(req, res, next, id) {
  try {
    const config = await Config.findById(id).exec();
    if (!config) return res.status(400).json({ error: "L'id n'existe pas" });
    req.config = config;
    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
}

async function getDeviseByID(req, res, next, id) {
  try {
    const devise = await Devise.findById(id).exec();
    if (!devise)
      return res.status(400).json({ error: "La devise n'existe pas" });
    req.devise = devise;
    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
}

async function checkName(req, res, next) {
  try {
    const data = await Devise.findOne({
      nom: req.body.nom,
    }).exec();

    if (req.devise && req.devise.nom === req.body.nom) {
      return next();
    }

    if (data && data.nom) {
      return next(new AppHttpError('Ce nom déjà pris', 400));
    }
    return next();
  } catch (error) {
    return next(
      new AppHttpError('An error has occurred.' + ' ' + error.message, 500)
    );
  }
}

module.exports = { checkName, getDeviseByID, getConfigByID };
