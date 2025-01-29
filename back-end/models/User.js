const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  spotifyId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: false },
});

module.exports = mongoose.model("User", UserSchema);
