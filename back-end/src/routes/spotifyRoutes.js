const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

router.post('/search', spotifyController.searchTracks);

module.exports = router;
