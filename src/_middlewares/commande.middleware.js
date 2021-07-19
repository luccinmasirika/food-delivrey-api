const Commande = require('../models/Commande.model');
const AppHttpError = require('../_helpers/appHttpError');

// Get commande by ID from params
async function getCommandeByID(req, res, next, id) {
  try {
    const commande = await Commande.findById(id).exec();
    if (!commande)
      return res.status(400).json({ error: "La commande n'existe pas" });
    req.commande = commande;
    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Something wont wrong' + error,
    });
  }
}

module.exports = { getCommandeByID };
