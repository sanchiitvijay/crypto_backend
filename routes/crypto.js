const express = require('express');
const router = express.Router();
const { getStats, getDeviation} = require('../controllers/crypto');

// API to get the latest stats of a cryptocurrency
router.get('/stats', getStats);

// API to get the standard deviation of the last 100 prices
router.get('/deviation', getDeviation);

module.exports = router;
