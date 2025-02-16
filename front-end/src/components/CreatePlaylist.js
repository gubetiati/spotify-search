import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const CreatePlaylist = ({ token, selectedTracks, onPlaylistCreated }) => {
  const [playlistName, setPlaylistName] = useState('');

  const handleCreatePlaylist = async () => {
    if (!playlistName.trim() || selectedTracks.length === 0) {
      alert('Preencha o nome da playlist e selecione pelo menos uma música.');
      return;
    }

    try {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          name: playlistName, 
          tracks: selectedTracks.map(track => track.name), 
        }),
      });

      console.log('Enviando playlist:', { name: playlistName, tracks: selectedTracks.map(track => track.name) });

      const data = await response.json();
      if (response.ok) {
        alert('Playlist criada com sucesso!');
        onPlaylistCreated(data.playlist); 
        setPlaylistName(''); 
      } else {
        alert(data.message || 'Erro ao criar playlist');
      }
    } catch (error) {
      console.error('Erro ao criar playlist:', error);
      alert('Erro ao criar playlist. Tente novamente.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
      <TextField
        label="Nome da Playlist"
        variant="outlined"
        fullWidth 
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        style={{ 
          marginBottom: '10px', 
          backgroundColor: '#282828', 
          color: 'white', 
          borderColor: '#535353' 
        }}
        InputLabelProps={{
          style: { color: '#b3b3b3' } 
        }}
        InputProps={{
          style: { color: 'white' } 
        }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCreatePlaylist}
        fullWidth 
        style={{ backgroundColor: '#1DB954', marginTop: '10px' }}
      >
        Criar Playlist
      </Button>
    </Box>
  );
};

export default CreatePlaylist;
