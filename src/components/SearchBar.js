import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTracks } from '../redux/searchSlice';
import { TextField, Button } from '@mui/material';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (query) {
      dispatch(fetchTracks(query));
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', margin: '20px' }}>
      <TextField
        label="Search for a song"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
