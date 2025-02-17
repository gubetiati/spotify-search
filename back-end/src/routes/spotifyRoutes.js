// src/routes/spotifyRoutes.js
const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

// Rota para buscar faixas no Spotify
router.post('/search', spotifyController.searchTracks);

module.exports = router;
