import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {fetchSearchId, fetchTickets} from './API.js'

export const fetchSearchThunk = createAsyncThunk('tickets/fetchSearchId', async (_, thunkAPI) => {
  try {
    const data = await fetchSearchId();
    return data.searchId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchTicketsThunk = createAsyncThunk('tickets/fetchTickets', async (searchId, thunkAPI) => {
  try {
    const data = await fetchTickets(searchId);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    searchId: null,
    tickets: [],
    status: 'idle',
    error: null,
    stop: false,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchThunk.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(fetchTicketsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTicketsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tickets = [...state.tickets, ...action.payload.tickets];
        state.stop = action.payload.stop;
      })
      .addCase(fetchTicketsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default ticketsSlice.reducer;
