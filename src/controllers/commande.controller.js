const Commande = require('../models/Commande.model');
const Plat = require('../models/Plat.model');
const AppHttpError = require('../_helpers/appHttpError');
const { readAllCommandeService } = require('../services/commande.service');

async function constrollorCreateService(req, res, next) {
  try {
    try {
      for (let i = 0; i < req.body.produit.length; i++) {
        const data = await Plat.findOne(
          {
            _id: req.body.produit[i],
          },
          { ets: 1 }
        ).exec();
        const commande = new Commande({
          client: req.body.client,
          produit: req.body.produit[i],
          ets: data.ets,
        });
        await commande.save();
      }

      res.json({ message: 'Opération réussi 😃' });
    } catch (error) {
      next(new AppHttpError('Une error est survenue' + error, 500));
    }
  } catch (error) {
    next(new AppHttpError('Une error est survenue' + error, 500));
  }
}

async function validerCommande(req, res, next) {
  try {
    await Commande.updateOne(
      { _id: req.commande._id },
      { $set: { etat: req.body.etat } }
    );
    return res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    return next(new AppHttpError('Une erreur est survenue' + error));
  }
}

async function livrerCommande(req, res, next) {
  try {
    const check = await Commande.findById(req.commande._id).exec();

    switch (check.etat) {
      case 'PENDING_FOR_VALIDATION':
        return next(
          new AppHttpError("La commande n'est pas encore validée", 400)
        );

      case 'PENDING_FOR_PAYMENT':
        return next(
          new AppHttpError(
            'Désolé, La commande est déjà en cours de livraison',
            400
          )
        );

      case 'DENIED':
        return next(new AppHttpError('La commande a été annulé', 400));

      case 'PAYIED':
        return next(new AppHttpError('La commande est déjà payé', 400));
    }

    await Commande.updateOne(
      { _id: req.commande._id, etat: 'VALIDATED' },
      { $set: { etat: 'PENDING_FOR_PAYMENT', livreur: req.user._id } }
    );
    return res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    return next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

async function payerCommande(req, res, next) {
  try {
    const check = await Commande.findById(req.commande._id).exec();

    switch (check.etat) {
      case 'PENDING_FOR_VALIDATION':
        return next(
          new AppHttpError("La commande n'est pas encore validée", 400)
        );
      case 'DENIED':
        return next(new AppHttpError('La commande a été annulé', 400));
      case 'PAYIED':
        return next(new AppHttpError('La commande est déjà payé', 400));
      case 'PENDING_FOR_VALIDATION':
        return next(
          new AppHttpError("La commande n'est pas encore validée", 400)
        );
    }

    if (req.body.etat === 'CANCELED' && check.etat === 'VALIDATED') {
      return next(
        new AppHttpError('Désolé, une commande acceptée ne peut être annuler')
      );
    }

    if (req.body.etat === 'PAYIED' && check.etat === 'DENIED') {
      return next(
        new AppHttpError('Désolé, une commande refusée ne peut être payer')
      );
    }

    await Commande.updateOne(
      { _id: req.commande._id },
      { $set: { etat: req.body.etat } }
    );
    return res.json({ message: 'Opération réussi 😃' });
  } catch (error) {
    return next(new AppHttpError('Une erreur est survenue' + error));
  }
}

async function readAllCommande(req, res, next) {
  try {
    const commande = await readAllCommandeService(req);
    if (!commande.total) return next(new AppHttpError('Pas commande trouvée'));
    res.json(commande);
  } catch (error) {
    next(new AppHttpError('Une erreur est survenue' + error, 500));
  }
}

module.exports = {
  constrollorCreateService,
  readAllCommande,
  validerCommande,
  livrerCommande,
  payerCommande,
};
