const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

router.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email";
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${encodeURIComponent(
    scope
  )}`;
  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  const { code } = req.query;
  
  if (!code) return res.status(400).json({ error: "Código de autorização ausente" });

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token } = response.data;

    const userInfo = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { id, display_name, email } = userInfo.data;

    let user = await User.findOne({ spotifyId: id });

    if (!user) {
      user = await User.create({ spotifyId: id, username: display_name, email });
    }

    const token = jwt.sign({ id: user._id, spotifyId: id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
  } catch (error) {
    console.error("Erro na autenticação:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Erro ao autenticar no Spotify" });
  }
});

module.exports = router;
