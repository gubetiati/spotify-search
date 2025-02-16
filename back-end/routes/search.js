const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', async (req, res) => {
  const { q } = req.query;
  const token = req.headers.authorization.split(' ')[1];

  try {
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${q}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data.tracks.items);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar músicas' });
  }
});

module.exports = router;