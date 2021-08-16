const router = require('express').Router();
const Commande = require('../models/Commande.model');
const {
  constrollorCreateService,
  readAllCommande,
  validerCommande,
  livrerCommande,
  payerCommande,
  closeCommande,
  commandeDataChart,
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
router.get('/chart/un/commande/:userId', commandeDataChart);

router.param('userId', getUserByID);
router.param('commandeId', getCommandeByID);

module.exports = router;
