import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortType: {
    name: 'popularity (asc)',
    sortBy: 'rating',
    order: 'asc',
  },
  searchQueue: '',
};


export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setSearchQueue(state, action) {
      state.searchQueue = action.payload;
    },
  },
});

export const { setCategoryId,
  setSortType,
  setSearchQueue } = filterSlice.actions;


export default filterSlice.reducer;
