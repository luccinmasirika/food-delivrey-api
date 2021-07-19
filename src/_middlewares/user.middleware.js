const User = require('../models/User.model');
const AppHttpError = require('../_helpers/appHttpError');
// Get user by ID from params
async function getUserByID(req, res, next, id) {
  try {
    const user = await User.findById(id).exec();
    if (!user)
      return res.status(400).json({ error: "L'utilisateur n'existe pas" });
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
}

async function checkEmail(req, res, next) {
  try {
    const data = await User.findOne({ email: req.body.email }).exec();
    if (data && data.email) {
      return next(new AppHttpError('Email déjà prise', 400));
    }
    return next();
  } catch (error) {
    return next(new AppHttpError('Error server' + error, 500));
  }
}

async function checkNumero(req, _res, next) {
  const data = await User.findOne({ telephone: req.body.telephone }).exec();
  if (data && data.telephone) {
    return next(new AppHttpError('Numéro déjà pris', 400));
  }
  return next();
}

async function checkId(req, _res, next) {
  const data = await User.findOne({ idPiece: req.body.idPiece }).exec();
  if (data && data.idPiece) {
    return next(new AppHttpError('ID déjà pris 🙄', 400));
  }
  return next();
}

module.exports = { checkEmail, getUserByID, checkNumero, checkId };
