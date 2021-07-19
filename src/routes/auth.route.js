const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/auth.contoller');
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
  signupLivreurValidator,
  checkEmail,
  checkId,
  checkNumero,
  signup
);
router.post('/client/signup', signupClientValidator, checkNumero, signup);
router.post('/signin', signin);

router.param('userId', getUserByID);

module.exports = router;
