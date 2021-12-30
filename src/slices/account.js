import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
export const initialState = {
  loading: false,
  error: false,
  items: {},
};

// our slice
const itemSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setItems: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.items = payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

// export the actions
export const { setLoading, setItems, setError } = itemSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const accountSelector = (state) => state.account;

// export the default reducer
export const {reducer} = itemSlice;

// set up axios - simple json-server prototype config here
const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// fetch all items
export function fetchItems() {
  return async (dispatch) => {
    api
    .get("/account/balance?address=SP13KT116B0A99C1FZB0M10NX3T1AWCPG0ZKYXSN")
    .then((response) => {
      dispatch(setItems(response.data));
    })
    .catch((er) => {
      dispatch(setError());
    });
  };
}