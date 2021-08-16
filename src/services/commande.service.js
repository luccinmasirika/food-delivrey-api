const Commande = require('../models/Commande.model');
const { GetService } = require('./get.service');
const Plat = require('../models/Plat.model');
const { Config } = require('../models/Config.model');

async function createCommandeService(
  distance,
  produit,
  client,
  ville,
  adresse1,
  adresse2,
  long,
  lat
) {
  const config = await Config.findOne({}, { fraisParKm: 1 }).exec();
  const FRAIS_DE_LIVRAISON = config.fraisParKm;
  const DISTANCE_CLIENT = distance;

  for (let i = 0; i < produit.length; i++) {
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
      prix:
        data.prix * produit[i].quantity + FRAIS_DE_LIVRAISON * DISTANCE_CLIENT,
      adresse: { ville, adresse1, adresse2, localisation: { long, lat } },
    });
    await commande.save();
  }
}

async function readAllCommandeService(params) {
  const filters = {};
  const { page, limit, startDate, endDate, etat, ets, livreur } = params.query;
  const query = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  if (startDate || endDate) {
    filters['createdAt'] = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  if (ets) {
    filters.ets = ets;
  }

  if (params.user.role === 1) {
    filters.ets = params.user.ets;
  }

  if (params.user.role === 3) {
    filters.client = params.user._id;
  }

  if (etat) {
    filters.etat = etat;
  }

  if (livreur) {
    filters.livreur = livreur;
  }

  return await new GetService(
    Commande.find()
      .populate('client')
      .populate('produit')
      .populate('livreur')
      .populate('ets'),
    query,
    filters
  ).pagination();
}

async function getChartData(params) {
  const filters = params ? params : { $nin: [] };
  const data = await Commande.aggregate([
    {
      $match: {
        ets: filters,
      },
    },
    {
      $addFields: {
        createdAt: {
          $cond: {
            if: {
              $eq: [
                {
                  $type: '$createdAt',
                },
                'date',
              ],
            },
            then: '$createdAt',
            else: null,
          },
        },
      },
    },
    {
      $addFields: {
        __alias_0: {
          month: {
            $subtract: [
              {
                $month: '$createdAt',
              },
              1,
            ],
          },
        },
      },
    },
    {
      $group: {
        _id: {
          __alias_0: '$__alias_0',
          __alias_1: '$etat',
        },
        __alias_2: {
          $sum: '$quantity',
        },
      },
    },
    {
      $project: {
        _id: 0,
        __alias_0: '$_id.__alias_0',
        __alias_1: '$_id.__alias_1',
        __alias_2: 1,
      },
    },
    {
      $project: {
        x: '$__alias_0',
        y: '$__alias_2',
        color: '$__alias_1',
        _id: 0,
      },
    },
    {
      $group: {
        _id: {
          x: '$x',
        },
        __grouped_docs: {
          $push: '$$ROOT',
        },
      },
    },
    {
      $sort: {
        '_id.x.month': 1,
      },
    },
    {
      $unwind: '$__grouped_docs',
    },
    {
      $replaceRoot: {
        newRoot: '$__grouped_docs',
      },
    },
    {
      $limit: 5000,
    },
  ]);

  return data;
}


module.exports = {
  readAllCommandeService,
  createCommandeService,
  getChartData,
};
