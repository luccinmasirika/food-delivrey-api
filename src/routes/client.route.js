const router = require('express').Router();
const { readAllClient } = require('../controllers/client.controller');
const { getUserByID } = require('../_middlewares/user.middleware');

router.get('/read/all/client/:userId', readAllClient);

router.param('userId', getUserByID);

module.exports = router;
