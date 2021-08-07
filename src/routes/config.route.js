const router = require('express').Router();
const {
  updateConfig,
  createDevise,
  updateDevise,
  updateIcon,
  updateLogo,
  readAllDevise,
  readConfig,
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
const { multer } = require('../_middlewares/multer.middleware');

router.post('/update/logo/:userId', multer, updateLogo);
router.post('/update/icon/:userId', multer, updateIcon);
router.post('/create/devise/:userId', deviseValidator, checkName, createDevise);
router.put('/update/devise/:userId', deviseValidator, checkName, updateDevise);
router.put('/update/config/:userId', configValidator, updateConfig);
router.get('/read/all/devise/:userId', readAllDevise);
router.get('/read/config', readConfig);

router.param('userId', getUserByID);
router.param('configId', getConfigByID);
router.param('deviseId', getDeviseByID);

module.exports = router;
