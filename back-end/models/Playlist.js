const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tracks: [{ type: String, required: true }], // IDs das músicas
});

module.exports = mongoose.model('Playlist', playlistSchema);