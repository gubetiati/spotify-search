import { useState, useEffect } from 'react';

const useSpotifyToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('spotifyToken');
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.warn('Token não disponível, faça login para obter um.');
    }
  }, []);

  return token;
};

export default useSpotifyToken;
