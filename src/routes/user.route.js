const express = require('express');
const router = express.Router();
const { getUserByID } = require('../_middlewares/user.middleware');
const { multer } = require('../_middlewares/multer.middlware');
const {
  readAll,
  read,
  update,
  disableAnableUser,
  updateInfo,
} = require('../controllers/user.controller');
const {
  updateUserValidator,
  updateClientValidator,
  updateLivreurValidator,
} = require('../validation/auth.validation');

router.get('/user/:userId', read);
router.get('/user/all/:userId', readAll);
router.put('/user/:userId', disableAnableUser);

router.put('/profil/user/:userId', updateUserValidator, multer, update);

router.put('/profil/livreur/:userId', updateLivreurValidator, multer, update);
router.put('/info/livreur/:userId', updateLivreurValidator, multer, updateInfo);

router.put('/profil/client/:userId', updateClientValidator, multer, update);

router.param('userId', getUserByID);

module.exports = router;
