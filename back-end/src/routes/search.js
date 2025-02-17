const express = require('express');
const router = express.Router();
const { searchTracks } = require('../controllers/searchController');

// Rota para buscar músicas no Spotify
router.get('/search', searchTracks);

module.exports = router;
