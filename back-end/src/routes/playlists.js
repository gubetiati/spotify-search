const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

// Rota POST para criar uma nova playlist
router.post('/', playlistController.createPlaylist);

// Rota GET para buscar todas as playlists
router.get('/', playlistController.getPlaylists);

module.exports = router;
