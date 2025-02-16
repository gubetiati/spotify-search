import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTracks = createAsyncThunk(
  'search/fetchTracks',
  async ({ query, token }) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.tracks?.items || [];
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    tracks: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tracks = action.payload;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.tracks = [];
      });
  },
});

export default searchSlice.reducer;