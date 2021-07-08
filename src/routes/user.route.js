const express = require('express');
const router = express.Router();
const { getUserByID } = require('../_middlewares/user.middleware');
const { multer } = require('../_middlewares/multer.middlware');
const {
  readAll,
  read,
  update,
  disableAnableUser,
} = require('../controllers/user.controller');
const { updateUserValidator } = require('../validation/auth.validation');

router.get('/user/:userId', read);
router.get('/user/all/:userId', readAll);
router.put('/user/:userId', disableAnableUser);
router.put('/profil/user/:userId', updateUserValidator, multer, update);

router.param('userId', getUserByID);

module.exports = router;
