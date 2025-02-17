// src/controllers/spotifyController.js
exports.searchTracks = async (req, res) => {
    const { query } = req.body;  // Obtendo a consulta (query) do corpo da requisição
    const token = req.headers.authorization?.split(' ')[1];  // Extraindo o token
  
    console.log('Corpo da requisição:', req.body);  // Logando o corpo da requisição para verificar se a query está presente
    console.log('Token:', token);  // Verificando se o token está presente
  
    if (!token) {
      return res.status(400).json({ message: 'Token de autorização é necessário.' });
    }
  
    if (!query) {
      return res.status(400).json({ message: 'A consulta (query) é obrigatória.' });
    }
  
    const spotifyUrl = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`;  // Rota da API do Spotify
  
    console.log('Requisição para o Spotify:', spotifyUrl);  // Logando a URL da requisição para o Spotify
  
    try {
      const response = await fetch(spotifyUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (data.error) {
        console.error('Erro do Spotify:', data.error);  // Logando o erro retornado pela API do Spotify
        return res.status(400).json({ message: 'Erro na requisição ao Spotify.' });
      }
  
      console.log('Resposta do Spotify:', data);  // Logando a resposta do Spotify
  
      res.status(200).json({ tracks: data.tracks.items });  // Retorna as faixas encontradas
    } catch (error) {
      console.error('Erro ao buscar músicas no Spotify:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  };
  