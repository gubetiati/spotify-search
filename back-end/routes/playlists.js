const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');

router.post('/', async (req, res) => {
  try {
    const { name, tracks } = req.body;

    if (!name || tracks.length === 0) {
      return res.status(400).json({ message: 'Nome da playlist e músicas são obrigatórios.' });
    }

    const newPlaylist = new Playlist({ name, tracks });
    await newPlaylist.save();

    res.status(201).json({ message: 'Playlist criada com sucesso!', playlist: newPlaylist });
  } catch (error) {
    console.error('Erro ao criar playlist:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find(); // Busca todas as playlists no banco de dados
    res.status(200).json(playlists); // Retorna as playlists encontradas
  } catch (error) {
    console.error('Erro ao buscar playlists:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

module.exports = router;
