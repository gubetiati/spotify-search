const Playlist = require('../models/Playlist');
const xss = require('xss'); // Para evitar XSS

// Função para criar uma nova playlist
exports.createPlaylist = async (req, res) => {
  const { name, tracks } = req.body;

  // Verificação dos campos obrigatórios
  if (!name || tracks.length === 0) {
    return res.status(400).json({ message: 'Nome da playlist e músicas são obrigatórios.' });
  }

  // Sanitizando os dados para evitar XSS
  const sanitizedName = xss(name);
  const sanitizedTracks = tracks.map(track => xss(track)); // Sanitizando apenas o nome das músicas

  try {
    const newPlaylist = new Playlist({ name: sanitizedName, tracks: sanitizedTracks });
    await newPlaylist.save(); // Salvando no banco de dados
    
    // Retornando sucesso
    res.status(201).json({ message: 'Playlist criada com sucesso!', playlist: newPlaylist });
  } catch (error) {
    console.error('Erro ao criar playlist:', error.message);
    res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
  }
};

// Função para buscar todas as playlists
exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find(); // Buscando todas as playlists no banco
    res.status(200).json(playlists); // Retornando playlists encontradas
  } catch (error) {
    console.error('Erro ao buscar playlists:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
