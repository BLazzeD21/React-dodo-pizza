import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortType: {
    name: 'popularity (asc)',
    sortBy: 'rating',
    order: 'asc',
  },
  searchQueue: '',
  currentPage: 0,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSortType,
  setSearchQueue, setCurrentPage } = filterSlice.actions;


export default filterSlice.reducer;
