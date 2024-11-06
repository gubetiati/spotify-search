import React from 'react';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import { Container, Typography } from '@mui/material';

const App = () => (
  <Container>
    <Typography variant="h4" align="center" gutterBottom>
      Spotify Tracks
    </Typography>
    <SearchBar />
    <TrackList />
  </Container>
);

export default App;
