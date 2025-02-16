import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks } from './redux/searchSlice';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import { Container, Typography, Box, CircularProgress, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getTokenFromUrl } from './utils/getTokenFromUrl';
import LoginButton from './components/LoginButton';
import CreatePlaylist from './components/CreatePlaylist';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function App() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [token, setToken] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [expandedPlaylistId, setExpandedPlaylistId] = useState(null);
  const dispatch = useDispatch();

  const tracks = useSelector((state) => state.search.tracks);
  const loading = useSelector((state) => state.search.loading);

  // Busca as playlists do back-end ao carregar o aplicativo
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/playlists');
        const data = await response.json();
        if (response.ok) {
          setPlaylists(data);
        } else {
          console.error('Erro ao buscar playlists:', data.message);
        }
      } catch (error) {
        console.error('Erro ao buscar playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    if (hash.access_token) {
      setToken(hash.access_token);
      localStorage.setItem('spotifyToken', hash.access_token);
    } else {
      const storedToken = localStorage.getItem('spotifyToken');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

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
      setSelectedTracks([]);
    }
  };

  const handleSelectTrack = (track) => {
    setSelectedTracks((prevSelected) => {
      const isSelected = prevSelected.some((t) => t.id === track.id);
      if (isSelected) {
        return prevSelected.filter((t) => t.id !== track.id); // Desmarcar a música
      } else {
        return [...prevSelected, track]; // Marcar a música
      }
    });
  };
  

  const handlePlaylistCreated = async () => {
    try {
      const response = await fetch('/api/playlists');
      const data = await response.json();
      if (response.ok) {
        setPlaylists(data);
        setSelectedTracks([]); // Limpa as músicas selecionadas após criar a playlist
      }
    } catch (error) {
      console.error('Erro ao atualizar playlists:', error);
    }
  };
  
  

  const togglePlaylist = (playlistId) => {
    setExpandedPlaylistId(expandedPlaylistId === playlistId ? null : playlistId);
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        padding: '20px',
        backgroundColor: '#121212',
        minHeight: '100vh',
        minWidth: '60vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {!token ? (
        <LoginButton />
      ) : (
        <>
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" style={{ color: '#1DB954', fontWeight: 'bold' }}>
              Spotify Search
            </Typography>
          </Box>

          <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} error={error} />

          {loading ? (
            <Box display="flex" justifyContent="center" mt={3}>
              <CircularProgress style={{ color: '#1DB954' }} /> {/* Verde Spotify */}
            </Box>
          ) : (
            <>
              {tracks.length > 0 && <TrackList tracks={tracks} onSelectTrack={handleSelectTrack} selectedTracks={selectedTracks} />}
              {tracks.length === 0 && query && (
                <Typography variant="body1" style={{ color: '#B3B3B3', marginTop: '20px' }}>
                  Nenhuma faixa encontrada para "{query}"
                </Typography>
              )}
            </>
          )}

          <CreatePlaylist
            token={token}
            selectedTracks={selectedTracks}
            onPlaylistCreated={handlePlaylistCreated}
          />

          {playlists.length > 0 && (
            <Box mt={3}>
              <Typography variant="h5" style={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: '10px' }}>
                Playlists Criadas
              </Typography>
              {playlists.map((playlist) => (
                <Box key={playlist._id} mt={2} style={{ backgroundColor: '#181818', borderRadius: '8px', padding: '10px' }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ cursor: 'pointer' }}
                    onClick={() => togglePlaylist(playlist._id)}
                  >
                    <Typography variant="body1" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      {playlist.name}
                    </Typography>
                    <IconButton>
                      {expandedPlaylistId === playlist._id ? (
                        <ExpandLessIcon style={{ color: '#1DB954' }} /> 
                      ) : (
                        <ExpandMoreIcon style={{ color: '#1DB954' }} /> 
                      )}
                    </IconButton>
                  </Box>
                  {expandedPlaylistId === playlist._id && (
                    <List style={{ marginTop: '10px' }}>
                      {playlist.tracks?.map((trackName, index) => (
                        <div key={index}>
                          <ListItem>
                            <ListItemText
                              primary={
                                <Typography style={{ color: '#FFFFFF', fontSize: '16px' }}>
                                  {trackName}
                                </Typography>
                              }
                            />
                          </ListItem>
                          <Divider style={{ backgroundColor: '#535353' }} />
                        </div>
                      ))}
                    </List>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default App;