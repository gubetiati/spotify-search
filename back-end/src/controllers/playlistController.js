const Playlist = require('../models/Playlist');
const validator = require('validator');
const xss = require('xss'); 

// Função para criar uma nova playlist
exports.createPlaylist = async (req, res) => {
  let { name, tracks } = req.body;

  if (!name || !Array.isArray(tracks) || tracks.length === 0) {
    return res.status(400).json({ message: 'Nome da playlist e músicas são obrigatórios.' });
  }

  // Sanitiza o nome e verifica caracteres perigosos
  if (!validator.isAlphanumeric(name.replace(/\s/g, ''))) { 
    return res.status(400).json({ message: 'Nome da playlist contém caracteres inválidos.' });
  }

  const sanitizedName = xss(name);
  const sanitizedTracks = tracks.map(track => validator.escape(xss(track))); // Evita caracteres perigosos

  try {
    const newPlaylist = new Playlist({ name: sanitizedName, tracks: sanitizedTracks });
    await newPlaylist.save();
    
    res.status(201).json({ message: 'Playlist criada com sucesso!', playlist: newPlaylist });
  } catch (error) {
    console.error('Erro ao criar playlist:', error.message);
    res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
  }
};

// Função para buscar todas as playlists
exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find(); // Busca todas as playlists no banco de dados
    res.status(200).json(playlists); // Retorna as playlists encontradas
  } catch (error) {
    console.error('Erro ao buscar playlists:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
