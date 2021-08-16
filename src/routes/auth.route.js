const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/auth.contoller');
const { signupLivreur } = require('../controllers/livreur.contoller');
const { signupClient } = require('../controllers/client.controller');
const { multer, multerArray } = require('../_middlewares/multer.middleware');
const { getUserByID } = require('../_middlewares/user.middleware');
const {
  signupValidator,
  signupLivreurValidator,
  signupClientValidator,
  signupUserValidator,
} = require('../validation/auth.validation');
const {
  checkEmail,
  checkId,
  checkNumero,
} = require('../_middlewares/user.middleware');

router.post('/admin/signup', signupValidator, checkEmail, signup);
router.post('/user/signup/:userId', signupUserValidator, checkEmail, signup);
router.post(
  '/livreur/signup/:userId',
  multer,
  signupLivreurValidator,
  checkEmail,
  checkId,
  checkNumero,
  signupLivreur
);
router.post(
  '/client/signup',
  multer,
  signupClientValidator,
  checkNumero,
  signupClient
);
router.post('/signin', signin);

router.param('userId', getUserByID);

module.exports = router;
