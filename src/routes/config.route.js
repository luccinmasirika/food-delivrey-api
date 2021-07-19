const router = require('express').Router();
const {
  updateConfig,
  createDevise,
  updateDevise,
  updateIcon,
  updateLogo,
  readAllDevise,
} = require('../controllers/config.controller');
const {
  configValidator,
  deviseValidator,
  logoIcon,
} = require('../validation/config.validation');
const { getUserByID } = require('../_middlewares/user.middleware');
const {
  getConfigByID,
  getDeviseByID,
  checkName,
} = require('../_middlewares/config.middleware');

router.put('/update/logo/:userId', logoIcon, updateLogo);
router.put('/update/icon/:userId', logoIcon, updateIcon);
router.post('/create/devise/:userId', deviseValidator, checkName, createDevise);
router.put(
  '/update/devise/:deviseId/:userId',
  deviseValidator,
  checkName,
  updateDevise
);
router.put('/update/config/:userId', configValidator, updateConfig);
router.get('/read/all/devise/:userId', readAllDevise);

router.param('userId', getUserByID);
router.param('configId', getConfigByID);
router.param('deviseId', getDeviseByID);

module.exports = router;
