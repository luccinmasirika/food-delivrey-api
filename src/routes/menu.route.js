const express = require('express');
const router = express.Router();
const { getUserByID } = require('../_middlewares/user.middleware');
const {
  getMenuByID,
  getCategoryByID,
  checkCategoryName,
  checkName,
} = require('../_middlewares/menu.middleware');
const { multer } = require('../_middlewares/multer.middleware');
const {
  constrollorCreateService,
  constrollorCreateCategoryService,
  readAllMenu,
} = require('../controllers/menu.contoller');
const {
  menuValidator,
  categoryValidator,
} = require('../validation/menu.validation');

router.post(
  '/create/menu/:userId',
  menuValidator,
  checkName,
  multer,
  constrollorCreateService
);

router.post(
  '/create/category/:userId',
  categoryValidator,
  checkCategoryName,
  constrollorCreateCategoryService
);

router.get('/read/all/menu/:userId', readAllMenu);

router.param('userId', getUserByID);

module.exports = router;
