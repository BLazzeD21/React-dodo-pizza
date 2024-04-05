import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const MOCKAPISECRET = import.meta.env.VITE_MOCKAPISECRET;

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