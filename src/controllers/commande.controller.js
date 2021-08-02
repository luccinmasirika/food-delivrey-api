const Commande = require('../models/Commande.model');
const Plat = require('../models/Plat.model');
const AppHttpError = require('../_helpers/appHttpError');
const { readAllCommandeService } = require('../services/commande.service');
const Config = require('../models/Config.model');
const ListRouge = require('../models/ListeRouge.model');

async function constrollorCreateService(req, res, next) {
  const FRAIS_DE_LIVRAISON = 2;
  const { produit, ville, adresse1, adresse2, long, lat, client } = req.body;
  try {
    try {
      for (let i = 0; i < req.body.produit.length; i++) {
        const data = await Plat.findOne(
          {
            _id: produit[i].id,
          },
          { ets: 1, prix: 1 }
        ).exec();
        const commande = new Commande({
          client,
          quantity: produit[i].quantity,
          produit: produit[i].id,
          ets: data.ets,
          prix: data.prix * produit[i].quantity + FRAIS_DE_LIVRAISON,
          adresse: { ville, adresse1, adresse2, localisation: { long, lat } },
        });
        await commande.save();
      }
      res.json({ message: 'Success operation' });
    } catch (error) {
      next(new AppHttpError('Une error est survenue' + error, 500));
    }
  } catch (error) {
    next(new AppHttpError('Une error est survenue' + error, 500));
  }
}

async function validerCommande(req, res, next) {
  try {
    if (req.user.ets.toString() !== req.commande.ets.toString()) {
      return next(
        new AppHttpError("Désolé, cette commande n'est pas la vôtre")
      );
    }
    await Commande.updateOne(
      { _id: req.commande._id },
      { $set: { etat: req.body.etat } }
    );
    return res.json({ message: 'Success operation' });
  } catch (error) {
    return next(new AppHttpError('An error has occurred' + error));
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
        return next(new AppHttpError('La commande est déjà payée', 400));
    }

    await Commande.updateOne(
      { _id: req.commande._id, etat: 'VALIDATED' },
      { $set: { etat: 'PENDING_FOR_PAYMENT', livreur: req.user._id } }
    );
    return res.json({ message: 'Success operation' });
  } catch (error) {
    return next(new AppHttpError('An error has occurred' + error, 500));
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
        return next(new AppHttpError('La commande est déjà payée', 400));
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

    if (req.body.etat === 'DENIED') {
      try {
        const addToList = new ListRouge({
          client: check.client,
          livreur: check.livreur,
          commande: check._id,
        });
        await addToList.save();
        return res.json({ message: 'Success operation' });
      } catch (error) {
        return next(new AppHttpError('An error has occurred' + error));
      }
    }

    await Commande.updateOne(
      { _id: req.commande._id },
      { $set: { etat: req.body.etat } }
    );
    return res.json({ message: 'Success operation' });
  } catch (error) {
    return next(new AppHttpError('An error has occurred' + error));
  }
}

async function readAllCommande(req, res, next) {
  try {
    const commande = await readAllCommandeService(req);
    if (!commande.total) return next(new AppHttpError('Pas commande trouvée'));
    console.log('commande', commande);
    res.json(commande);
  } catch (error) {
    next(new AppHttpError('An error has occurred' + error, 500));
  }
}

module.exports = {
  constrollorCreateService,
  readAllCommande,
  validerCommande,
  livrerCommande,
  payerCommande,
};
