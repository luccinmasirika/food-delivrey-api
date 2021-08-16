const express = require('express');
const router = express.Router();
const { getUserByID } = require('../_middlewares/user.middleware');
const { multer } = require('../_middlewares/multer.middleware');
const {
  readAll,
  read,
  update,
  disableAnableUser,
  updateInfo,
  readAllAdmin,
} = require('../controllers/user.controller');
const {
  updateUserValidator,
  updateClientValidator,
  updateLivreurValidator,
} = require('../validation/auth.validation');

const { readAllLivreur } = require('../controllers/livreur.contoller');

router.get('/user/:userId', read);
router.get('/read/all/user/:userId', readAll);
router.put('/user/:userId', disableAnableUser);

router.put('/update/profil/user/:userId', updateUserValidator, multer, update);

router.put(
  '/update/profil/livreur/:userId',
  updateLivreurValidator,
  multer,
  update
);
router.put(
  '/update/info/livreur/:userId',
  updateLivreurValidator,
  multer,
  updateInfo
);
router.get('/read/all/livreur/:userId', readAllLivreur);
router.get('/read/all/admin/:userId', readAllAdmin);

router.put(
  '/update/profil/client/:userId',
  updateClientValidator,
  multer,
  update
);

router.param('userId', getUserByID);

module.exports = router;
