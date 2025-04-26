import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  all: true,
  transfers: {
    0: true,
    1: true,
    2: true,
    3: true,
  },
  sortBy: 'cheapest',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleAll(state) {
      const newValue = !state.all;
      state.all = newValue;
      for (let key in state.transfers) {
        state.transfers[key] = newValue;
      }
    },

    toggleTransfer(state, action) {
      const key = action.payload;

      if (state.transfers[key]) {
        state.transfers[key] = false;
        state.all = false;
        return;
      }

      state.transfers[key] = true;

      if (state.transfers[0] && state.transfers[1] && state.transfers[2] && state.transfers[3]) {
        state.all = true;
        return;
      }

      state.all = false;
    },

    setSortBy(state, action) {
      state.sortBy = action.payload;
      console.log(state.sortBy);
    },
  },
});

export const { toggleAll, toggleTransfer, setSortBy } = filtersSlice.actions;
export default filtersSlice.reducer;
