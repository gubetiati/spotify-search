import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTracks } from '../redux/searchSlice';
import { TextField, Button } from '@mui/material';
import useSpotifyToken from '../hooks/useSpotifyToken';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const token = useSpotifyToken();

  const handleSearch = () => {
    if (!query.trim()) {
      setError(true);
      return;
    }
    setError(false);

    if (token) {
      dispatch(fetchTracks({ query, token }));
    } else {
      console.error('Token indisponível');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px' }}>
      <TextField
        label="Digite uma música"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        error={error}
        helperText={error ? "O campo não pode estar vazio." : ""}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Buscar
      </Button>
    </div>
  );
};

export default SearchBar;
