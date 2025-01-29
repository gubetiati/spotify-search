const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  songs: [
    {
      spotifyId: { type: String, required: true },
      title: { type: String, required: true },
      artist: { type: String, required: true },
      album: { type: String },
      coverUrl: { type: String },
    },
  ],
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
