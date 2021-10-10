import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    profile: {
      id: 0,
      username: "",
    },
  },
  reducers: {},

  extraReducers: (builder) => {},
});

export const selectProfile = (state: RootState) => state.auth.profile;

export default authSlice.reducer;
