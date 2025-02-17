const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  tracks: [{ type: String, required: true }]
});

module.exports = mongoose.model('Playlist', playlistSchema);
