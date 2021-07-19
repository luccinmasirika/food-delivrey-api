const express = require('express');
const router = express.Router();
const { getUserByID } = require('../_middlewares/user.middleware');
const { getPlatByID, checkName } = require('../_middlewares/plat.middleware');
const { multer, multerArray } = require('../_middlewares/multer.middleware');
const {
  constrollorCreateService,
  readAllPlat,
} = require('../controllers/plat.contoller');
const { platValidator } = require('../validation/plat.validation');

router.post(
  '/create/plat/:userId',
  platValidator,
  checkName,
  multer,
  constrollorCreateService
);

router.post(
  '/create/images/plat/:userId',
  multerArray,
  constrollorCreateService
);

router.get('/read/all/plat/:userId', readAllPlat);

router.param('userId', getUserByID);

module.exports = router;
