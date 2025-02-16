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
      console.log('Dados enviados:', { // Log dos dados enviados
        name: playlistName,
        tracks: selectedTracks.map(track => track.id),
      });
  
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          name: playlistName, 
          tracks: selectedTracks.map(track => track.id),
        }),
      });
  
      console.log('Resposta do back-end:', response); // Log da resposta do back-end
  
      const data = await response.json();
      console.log('Dados da resposta:', data); // Log dos dados da resposta
  
      if (response.ok) {
        alert('Playlist criada com sucesso!');
        onPlaylistCreated(data.playlist);
        setPlaylistName('');
      } else {
        alert(data.message || 'Erro ao criar playlist');
      }
    } catch (error) {
      console.error('Erro ao criar playlist:', error); // Log do erro
      alert('Erro ao criar playlist. Tente novamente.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
      <TextField
        label="Nome da Playlist"
        variant="outlined"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCreatePlaylist}
        style={{ backgroundColor: '#1DB954', marginTop: '10px' }}
      >
        Criar Playlist
      </Button>
    </Box>
  );
};

export default CreatePlaylist;