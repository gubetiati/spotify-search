const axios = require('axios');

exports.searchMusic = async (req, res) => {
  const { q } = req.query;  
  const token = req.headers.authorization.split(' ')[1]; 
  
  if (!token) {
    return res.status(400).json({ message: 'Token não encontrado!' });
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${q}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data.tracks.items);  // Retornar as músicas encontradas
  } catch (error) {
    console.error('Erro ao buscar músicas:', error);
    res.status(500).json({ message: 'Erro ao buscar músicas' });
  }
};
