import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterSliceState } from "./types";

const initialState: filterSliceState = {
  categoryId: 0,
  sortType: {
    name: "popularity (asc)",
    sortBy: "rating",
    order: "asc",
  },
  searchQueue: "",
  currentPage: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<sort>) {
      state.sortType = action.payload;
    },
    setSearchQueue(state, action: PayloadAction<string>) {
      state.searchQueue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<filter>) {
      state.categoryId = action.payload.categoryId;
      state.sortType.sortBy = action.payload.sortType.sortBy;
      state.sortType.order = action.payload.sortType.order;
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setSearchQueue,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
