const Plat = require('../models/Plat.model');
const AppHttpError = require('../_helpers/appHttpError');

// Get type by ID from params
async function getPlatByID(req, res, next, id) {
  try {
    const plat = await Plat.findById(id).exec();
    if (!plat) return res.status(400).json({ error: "Le type n'existe pas" });
    req.plat = plat;
    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
}

async function checkName(req, res, next) {
  try {
    const data = await Plat.findOne({
      nom: req.body.nom,
      menu: req.body.menu,
    }).exec();
    if (data && data.nom) {
      return next(new AppHttpError('Ce nom déjà pris', 400));
    }
    return next();
  } catch (error) {
    return next(new AppHttpError('An error has occurred' + error, 500));
  }
}

module.exports = { checkName, getPlatByID };
