const Type = require('../models/Type.model');
const AppHttpError = require('../_helpers/appHttpError');

// Get type by ID from params
async function getTypeByID(req, res, next, id) {
  try {
    const type = await Type.findById(id).exec();
    if (!type) return res.status(400).json({ error: "Le type n'existe pas" });
    req.type = type;
    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
}

async function checkName(req, res, next) {
  try {
    const data = await Type.findOne({
      nom: req.body.nom,
    }).exec();
    if (data && data.nom) {
      return next(new AppHttpError('Ce nom déjà pris', 400));
    }
    return next();
  } catch (error) {
    return next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

module.exports = { checkName, getTypeByID };
