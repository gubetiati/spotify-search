import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText } from '@mui/material';

const TrackList = () => {
  const { tracks, status } = useSelector((state) => state.search);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error loading tracks.</p>;
  if (tracks.length === 0) return <p>No tracks found.</p>;

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
