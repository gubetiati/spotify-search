const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tracks: [{ type: String, required: true }] // Agora só armazena o nome da música
});

module.exports = mongoose.model('Playlist', playlistSchema);
