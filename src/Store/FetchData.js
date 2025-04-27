import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, thunkAPI) => {
  try {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');
    const data = await res.json();
    console.log(data.searchId);
    return data.searchId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (searchId, thunkAPI) => {
  try {
    const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
    const data = await res.json();
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
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tickets = [...state.tickets, ...action.payload.tickets];
        state.stop = action.payload.stop;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default ticketsSlice.reducer;
