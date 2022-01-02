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
const apiHost = process.env.NEXT_PUBLIC_CHAIN === 'testnet' ? "http://localhost:3001" : "http://ec2-18-221-211-18.us-east-2.compute.amazonaws.com:3002"
const api = axios.create({
  baseURL: apiHost,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// fetch all items
export function fetchItems(address) {
  return async (dispatch) => {
    getBalance(address)
    .then((response) => {
      dispatch(setItems(response.data));
    })
    .catch((er) => {
      dispatch(setError());
    });
  };
}

export function getBalance(address){
  return api.get(`/account/balance?address=${address}`);
}
