const express = require('express');
const router = express.Router();
const { getUserByID } = require('../_middlewares/user.middleware');
const { multer } = require('../_middlewares/multer.middleware');
const { getTypeByID, checkName } = require('../_middlewares/type.middleware');
const { constrollorCreateService } = require('../controllers/type.contoller');
const { typeValidator } = require('../validation/type.validation');

router.post(
  '/create/type/:userId',
  typeValidator,
  checkName,
  multer,
  constrollorCreateService
);

router.param('userId', getUserByID);

module.exports = router;
