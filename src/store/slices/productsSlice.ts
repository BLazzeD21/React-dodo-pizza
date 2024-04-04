import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { RootState } from "../store";

const MOCKAPISECRET = import.meta.env.VITE_MOCKAPISECRET;

export enum Status {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

interface productsSliceState {
  products: Product[];
  status: Status;
}

const initialState: productsSliceState = {
  products: [],
  status: Status.PENDING,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  Record<string, string>
>("products/fetchProducts", async (params, thunkAPI) => {
  const { sortBy, order, categoryId } = params;
  const url = new URL(`https://${MOCKAPISECRET}.mockapi.io/api/pizzas`);

  url.searchParams.append("sortBy", sortBy);
  url.searchParams.append("order", order);
  url.searchParams.append("category", categoryId);

  const config: AxiosRequestConfig = {
    method: "GET",
    url: String(url),
    headers: {
      "content-type": "application/json",
    },
  };

  const response: AxiosResponse<Product[]> = await axios(config);

  const data = response.data;

  if (!data) return thunkAPI.rejectWithValue("Array is empty");

  return data;
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products = [];
        state.status = Status.PENDING;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.status = Status.FULFILLED;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.products = [];
        state.status = Status.REJECTED;
      });
  },
});

export const selectProducts = (state: RootState) => state.products;

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
