const Commande = require('../models/Commande.model');
const Plat = require('../models/Plat.model');
const AppHttpError = require('../_helpers/appHttpError');
const {
  createCommandeService,
  readAllCommandeService,
  getChartData,
} = require('../services/commande.service');
const { statsClient, statsLivreur } = require('../_helpers/statUsers');
const ListRouge = require('../models/ListeRouge.model');

async function constrollorCreateService(req, res, next) {
  const { distance, produit, ville, adresse1, adresse2, long, lat } = req.body;
  try {
    await createCommandeService(
      distance,
      produit,
      req.user._id,
      ville,
      adresse1,
      adresse2,
      long,
      lat
    );
    return res.json({ message: 'Success' });
  } catch (error) {
    next(new AppHttpError('An error has occurred.' + ' ' + error.message));
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
    if (req.body.etat === 'DENIED') {
      await statsClient('DENIED', req.commande.client);
    }
    return res.json({ message: 'Success operation' });
  } catch (error) {
    return next(
      new AppHttpError('An error has occurred.' + ' ' + error.message)
    );
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
    await statsLivreur('PENDING', req.user._id);
    return res.json({ message: 'Success operation' });
  } catch (error) {
    return next(
      new AppHttpError('An error has occurred.' + ' ' + error.message, 500)
    );
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
        await statsLivreur('CLOSED', check.livreur);
        await statsLivreur('UNPENDING', check.livreur);
        await statsClient('DENIED', req.user._id);
        return res.json({ message: 'Success operation' });
      } catch (error) {
        return next(
          new AppHttpError('An error has occurred.' + ' ' + error.message)
        );
      }
    }

    await Commande.updateOne(
      { _id: req.commande._id },
      { $set: { etat: req.body.etat } }
    );
    await statsClient('PAYIED', req.user._id);
    await statsLivreur('PAYIED', check.livreur);
    await statsLivreur('UNPENDING', check.livreur);
    return res.json({ message: 'Success operation' });
  } catch (error) {
    return next(
      new AppHttpError('An error has occurred.' + ' ' + error.message)
    );
  }
}

async function readAllCommande(req, res, next) {
  try {
    const commande = await readAllCommandeService(req);
    res.json(commande);
  } catch (error) {
    next(new AppHttpError('An error has occurred.' + ' ' + error.message, 500));
  }
}

async function closeCommande(req, res, next) {
  try {
    const check = await Commande.findOne(
      { _id: req.commande._id },
      { etat: 1 }
    );
    if (check.etat !== 'PAYIED') {
      return next(new AppHttpError('Action denied', 400));
    }
    await Commande.updateOne(
      { _id: req.commande._id },
      { $set: { etat: 'CLOSED' } }
    );
    return res.json({ message: 'Succcess operation' });
  } catch (error) {
    next(new AppHttpError('An error has occurred.' + ' ' + error.message, 500));
  }
}

async function commandeDataChart(req, res, next) {
  try {
    const query = req.user.role === 1 ? req.user.ets : req.query.ets;
    const data = await getChartData(query);
    return res.json(data);
  } catch (error) {
    next(new AppHttpError('An error has occurred.' + ' ' + error.message, 500));
  }
}

module.exports = {
  constrollorCreateService,
  readAllCommande,
  validerCommande,
  livrerCommande,
  payerCommande,
  closeCommande,
  commandeDataChart,
};
