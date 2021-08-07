const router = require('express').Router();
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

router.param('userId', getUserByID);
router.param('commandeId', getCommandeByID);

module.exports = router;
