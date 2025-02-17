import React from 'react';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-public",  
  "playlist-modify-private" 
];

const authEndpoint = "https://accounts.spotify.com/authorize";
const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = authUrl;
  };

  return (
    <button onClick={handleLogin} style={{ padding: '10px 20px', backgroundColor: '#1DB954', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>
      Login com Spotify
    </button>
  );
};

export default LoginButton