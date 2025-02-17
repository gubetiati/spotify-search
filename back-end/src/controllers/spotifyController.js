const xss = require('xss');

exports.searchTracks = async (req, res) => {
    let { query } = req.body;  
    const token = req.headers.authorization?.split(' ')[1];

    console.log('Corpo da requisição:', req.body);
    console.log('Token:', token);

    if (!token) {
        return res.status(400).json({ message: 'Token de autorização é necessário.' });
    }

    if (!query) {
        return res.status(400).json({ message: 'A consulta (query) é obrigatória.' });
    }

    // **Sanitizando a query para evitar XSS e injeçã
    query = xss(query);  
    query = encodeURIComponent(query); 

    const spotifyUrl = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`;

    console.log('Requisição para o Spotify:', spotifyUrl);

    try {
        const response = await fetch(spotifyUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (data.error) {
            console.error('Erro do Spotify:', data.error);
            return res.status(400).json({ message: 'Erro na requisição ao Spotify.' });
        }

        console.log('Resposta do Spotify:', data);

        res.status(200).json({ tracks: data.tracks.items });
    } catch (error) {
        console.error('Erro ao buscar músicas no Spotify:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
