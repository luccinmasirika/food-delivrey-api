const express = require('express');
const router = express.Router();
const { getUserByID } = require('../_middlewares/user.middleware');
const { getStats } = require('../controllers/stats.contoller');

router.get('/stats/un/:usersId', getStats);

router.param('userId', getUserByID);

module.exports = router;
