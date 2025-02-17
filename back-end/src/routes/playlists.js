const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.post('/', playlistController.createPlaylist);

router.get('/', playlistController.getPlaylists);

module.exports = router;
