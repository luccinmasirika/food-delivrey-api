const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/auth.contoller');
const {
  signupValidator,
  signupLivreurValidator,
  signupClientValidator,
} = require('../validation/auth.validation');
const {
  checkEmail,
  checkId,
  checkNumero,
} = require('../_middlewares/user.middleware');

router.post('/user/signup', signupValidator, checkEmail, signup);
router.post(
  '/livreur/signup',
  signupLivreurValidator,
  checkEmail,
  checkId,
  checkNumero,
  signup
);
router.post('/client/signup', signupClientValidator, checkNumero, signup);
router.post('/signin', signin);

module.exports = router;
