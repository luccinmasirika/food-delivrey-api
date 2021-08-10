const router = require('express').Router();
const Commande = require('../models/Commande.model');
const {
  constrollorCreateService,
  readAllCommande,
  validerCommande,
  livrerCommande,
  payerCommande,
  closeCommande,
} = require('../controllers/commande.controller');
const {
  createCommandeValidator,
  accepterCommandeValidator,
  payerCommandeValidator,
} = require('../validation/commande.validation');
const { getUserByID } = require('../_middlewares/user.middleware');
const { getCommandeByID } = require('../_middlewares/commande.middleware');

router.post(
  '/create/commande/:userId',
  createCommandeValidator,
  constrollorCreateService
);
router.get('/read/all/commande/:userId', readAllCommande);
router.put(
  '/valider/commande/:commandeId/:userId',
  accepterCommandeValidator,
  validerCommande
);
router.put('/livrer/commande/:commandeId/:userId', livrerCommande);
router.put(
  '/payer/commande/:commandeId/:userId',
  payerCommandeValidator,
  payerCommande
);
router.put('/close/commande/:commandeId/:userId', closeCommande);

router.get('/test', async (req, res) => {
  const cmd = await Commande.aggregate([
    {
      $match: {
        ets: {
          $nin: [],
        },
        createdAt: {
          $gte: {
            $date: '2021-01-01T00:00:00Z',
          },
          $lt: {
            $date: '2022-01-01T00:00:00Z',
          },
        },
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
          year: {
            $year: '$createdAt',
          },
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
        '_id.x.year': 1,
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
  return res.json(cmd);
});

router.param('userId', getUserByID);
router.param('commandeId', getCommandeByID);

module.exports = router;
