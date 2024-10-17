const express = require('express');
const router = express.Router()

const dashboardController = require('../controllers/index')

router.get('/mocks', dashboardController.getMocks);

module.exports = router;