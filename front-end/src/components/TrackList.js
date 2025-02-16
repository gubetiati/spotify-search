import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography, Checkbox } from '@mui/material';

const TrackList = ({ tracks, onSelectTrack }) => {
  return (
    <List style={{ marginTop: '20px' }}>
      {tracks.map((track, index) => (
        <div key={index}>
          <ListItem>
            <Checkbox
              color="primary"
              onChange={() => onSelectTrack(track)} // Adiciona/remove a música da lista de selecionadas
            />
            <ListItemText
              primary={<Typography style={{ color: '#ffffff', fontSize: '16px' }}>{track.name}</Typography>}
              secondary={<Typography style={{ color: '#b3b3b3', fontSize: '14px' }}>{track.artists.map(artist => artist.name).join(", ")}</Typography>}
            />
          </ListItem>
          <Divider style={{ backgroundColor: '#535353' }} />
        </div>
      ))}
    </List>
  );
};

export default TrackList;