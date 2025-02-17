import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTracks = createAsyncThunk(
  'search/fetchTracks',
  async ({ query, token }) => {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Envia o token na autorização
      },
      body: JSON.stringify({ query }),  // Corpo da requisição com a query
    });
    const data = await response.json();
    return data.tracks || [];
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
