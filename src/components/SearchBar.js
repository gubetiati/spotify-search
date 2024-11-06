// src/components/SearchBar.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTracks } from '../redux/searchSlice';
import { TextField, Button, Typography } from '@mui/material';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (query.trim() === '') {
      setError(true);
    } else {
      setError(false);
      dispatch(fetchTracks(query));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px' }}>
      <TextField
        label="Search for a song"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        error={error}
        helperText={error ? "O campo de busca não pode estar vazio." : ""}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
