const Ets = require('../models/Ets.model');
const AppHttpError = require('../_helpers/appHttpError');

// Get ets by ID from params
async function getEtsByID(req, res, next, id) {
  try {
    const ets = await Ets.findById(id).exec();
    if (!ets)
      return res.status(400).json({ error: "L'établissement n'existe pas" });
    req.ets = ets;
    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
}

async function checkName(req, res, next) {
  try {
    const data = await Ets.findOne({
      nom: req.body.nom,
    }).exec();
    if (data && data.nom) {
      return next(new AppHttpError('Ce nom déjà pris', 400));
    }
    return next();
  } catch (error) {
    return next(new AppHttpError('An error has occurred' + error, 500));
  }
}

module.exports = { checkName, getEtsByID };
