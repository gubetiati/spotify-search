import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material'; 
import { useDispatch } from 'react-redux';
import { fetchTracks } from '../redux/searchSlice';

const SearchBar = ({ query, setQuery, error }) => {
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (query.trim()) {
      const token = localStorage.getItem('spotifyToken');
      dispatch(fetchTracks({ query, token }));
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
      <TextField
        label="Pesquise uma faixa, artista ou álbum"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        error={error}
        helperText={error ? "Campo de busca é obrigatório!" : ""}
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
        onClick={handleSearch} 
        fullWidth
        style={{ backgroundColor: '#1DB954', marginTop: '10px' }}
      >
        Buscar
      </Button>
    </Box>
  );
};

export default SearchBar;
