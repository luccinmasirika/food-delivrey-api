const express = require('express');
const router = express.Router();
const { getUserByID } = require('../_middlewares/user.middleware');
const { getPlatByID, checkName } = require('../_middlewares/plat.middleware');
const { multer } = require('../_middlewares/multer.middleware');
const {
  constrollorCreateService,
  readAllPlat,
  addOtherImages,
  promoControllor,
  disableUnableControllor,
  updatePlat,
  readRandomPlat,
  removeOtherImages,
} = require('../controllers/plat.contoller');
const {
  platValidator,
  platEditValidator,
} = require('../validation/plat.validation');

router.post(
  '/create/plat/:userId',
  multer,
  checkName,
  platValidator,
  constrollorCreateService
);

router.get('/read/all/plat/:userId', readAllPlat);
router.get('/promo/plat/:userId', promoControllor);
router.get('/disableUnable/plat/:userId', disableUnableControllor);
router.post('/add/images/plat/:userId', multer, addOtherImages);
router.put(
  '/update/plat/:userId',
  multer,
  checkName,
  platEditValidator,
  updatePlat
);
router.get('/random/plat', readRandomPlat);
router.put('/pull/plat/images/:userId', removeOtherImages);

router.param('userId', getUserByID);

module.exports = router;
