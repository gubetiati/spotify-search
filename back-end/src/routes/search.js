const express = require('express');
const router = express.Router();
const { searchTracks } = require('../controllers/searchController');

router.get('/search', searchTracks);

module.exports = router;
