const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

router.post('/', async (req, res) => {
  const { name, tracks } = req.body;

  console.log('Dados recebidos:', { name, tracks }); // Log dos dados recebidos

  if (!name || !tracks || tracks.length === 0) {
    return res.status(400).json({ message: 'Nome e músicas são obrigatórios.' });
  }

  try {
    const newPlaylist = new Playlist({ name, tracks });
    await newPlaylist.save();
    console.log('Playlist criada:', newPlaylist); // Log da playlist criada
    res.status(201).json({ message: 'Playlist criada com sucesso!', playlist: newPlaylist });
  } catch (error) {
    console.error('Erro ao criar playlist:', error); // Log do erro
    res.status(500).json({ message: 'Erro ao criar playlist.' });
  }
});

module.exports = router;