import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTracks = createAsyncThunk(
  'search/fetchTracks',
  async (query) => {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`)}`,
      },
      body: 'grant_type=client_credentials',
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data.tracks.items;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    tracks: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracks = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default searchSlice.reducer;