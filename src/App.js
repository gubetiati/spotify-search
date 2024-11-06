import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks } from './redux/searchSlice'; 
import useSpotifyToken from './hooks/useSpotifyToken';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import { Container, Typography, Box, CircularProgress } from '@mui/material'; 

function App() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const token = useSpotifyToken();

  const tracks = useSelector((state) => state.search.tracks);
  const loading = useSelector((state) => state.search.loading);

  useEffect(() => {
    if (token && query) {
      dispatch(fetchTracks({ query, token }));
    }
  }, [dispatch, query, token]);

  const handleSearch = () => {
    if (!query.trim()) {
      setError(true);
      return;
    }
    setError(false);
    if (token) {
      dispatch(fetchTracks({ query, token }));
    } else {
      console.error('Token não disponível');
    }
  };

  return (
    <Container 
    maxWidth="sm" 
    style={{ 
      padding: '20px', 
      backgroundColor: '#181818', 
      minHeight: '100vh',
      minWidth: '60vw',
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center'
      }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" color="white">Spotify Search</Typography>
      </Box>

      <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} error={error} />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          {tracks.length > 0 && <TrackList tracks={tracks} />}
          {tracks.length === 0 && !loading && query && (
            <Typography variant="body1" color="white" mt={2}>Nenhuma faixa encontrada para "{query}"</Typography>
          )}
        </>
      )}
    </Container>
  );
}

export default App;
