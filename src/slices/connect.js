import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  additional: false
};

const slice = createSlice({
  name: 'connect',
  initialState,
  reducers: {
    setConnected(state, action) {
      state.connected = action.payload;
    }
  }
});

export const {reducer} = slice;

export const {setConnected} = slice.actions
