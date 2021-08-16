const Commande = require('../models/Commande.model');
const User = require('../models/User.model');
const Ets = require('../models/Ets.model');
const AppHttpError = require('../_helpers/appHttpError');

async function getStats(req, res, next) {
  try {
    const ets = await Ets.countDocuments().exec();
    const user = await User.countDocuments({ role: 3 }).exec();
    const commande = await Commande.find({}, { quantity: 1 }).exec();

    let qte = 0;

    commande.forEach((element) => {
      qte += element.quantity;
    });

    return res.json({ ets, user, commande: qte });
  } catch (error) {
    next(new AppHttpError('An error has occurred.' + ' ' + error.message, 500));
  }
}

module.exports = { getStats };
