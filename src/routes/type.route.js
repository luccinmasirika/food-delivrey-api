const express = require('express');
const router = express.Router();
const { getUserByID } = require('../_middlewares/user.middleware');
const { multer } = require('../_middlewares/multer.middleware');
const { requireSignin, isAuth } = require('../_middlewares/auth.middleware');
const { getTypeByID, checkName } = require('../_middlewares/type.middleware');
const {
  constrollorCreateService,
  readAllType,
  updateType,
} = require('../controllers/type.contoller');
const { typeValidator } = require('../validation/type.validation');

router.post(
  '/create/type/:userId',
  requireSignin,
  isAuth,
  checkName,
  multer,
  typeValidator,
  constrollorCreateService
);
router.put('/update/type/:userId', requireSignin, isAuth, multer, updateType);
router.get('/read/all/type/:userId', requireSignin, isAuth, readAllType);

router.param('userId', getUserByID);

module.exports = router;
