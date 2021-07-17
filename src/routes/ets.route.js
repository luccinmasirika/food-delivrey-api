const express = require('express');
const router = express.Router();
const { getUserByID } = require('../_middlewares/user.middleware');
const { getEtsByID, checkName } = require('../_middlewares/ets.middleware');
const { multer } = require('../_middlewares/multer.middleware');
const { constrollorCreateService, readAllEts } = require('../controllers/ets.contoller');
const { etsValidator } = require('../validation/ets.validation');

router.post(
  '/create/ets/:userId',
  etsValidator,
  checkName,
  multer,
  constrollorCreateService
);

router.get('/read/all/ets/:userId', readAllEts)

router.param('userId', getUserByID);

module.exports = router;
