import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const TrackList = () => {
  const { tracks, status } = useSelector((state) => state.search);

  if (status === 'loading') return <p>Carregando...</p>;
  if (status === 'failed') return <Typography color="error">Erro ao buscar músicas. Por favor, tente mais tarde.</Typography>;
  if (tracks.length === 0) return <Typography>Músicas não encontradas.</Typography>;

  return (
    <List>
      {tracks.map((track) => (
        <ListItem key={track.id}>
          <ListItemText primary={track.name} secondary={track.artists.map((artist) => artist.name).join(', ')} />
        </ListItem>
      ))}
    </List>
  );
};

export default TrackList;
