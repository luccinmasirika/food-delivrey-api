const express = require('express');
const router = express.Router();
const { getUserByID } = require('../_middlewares/user.middleware');
const { getEtsByID, checkName } = require('../_middlewares/ets.middleware');
const { requireSignin, isAuth } = require('../_middlewares/auth.middleware');
const { multer } = require('../_middlewares/multer.middleware');
const {
  constrollorCreateService,
  readAllEts,
  updateEts,
  disableUnableControllor,
} = require('../controllers/ets.contoller');
const {
  etsValidator,
  etsEditValidator,
} = require('../validation/ets.validation');

router.post(
  '/create/ets/:userId',
  checkName,
  multer,
  etsValidator,
  constrollorCreateService
);
router.get('/read/all/ets/:userId', requireSignin, isAuth, readAllEts);
router.put(
  '/update/ets/:userId',
  requireSignin,
  isAuth,
  multer,
  etsEditValidator,
  updateEts
);
router.get('/disableUnable/ets/:userId', disableUnableControllor);

router.param('userId', getUserByID);
router.param('estId', getEtsByID);

module.exports = router;
