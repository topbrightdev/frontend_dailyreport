import { createSlice } from "@reduxjs/toolkit";

import { AuthState } from "./types";
import {
  signinWithToken,
  signin,
  signupverify,
  forgotpasswordverify,
  signout,
  signup,
} from "./actions";

const initialState: AuthState = {
  user: {
    id: 0,
    email: "",
    name:"",
  },
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(signin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signinWithToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinWithToken.fulfilled, (state, action) => {
        state.loading = false;
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(signinWithToken.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signupverify.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupverify.fulfilled, (state, action) => {
        state.loading = false;
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(signupverify.rejected, (state) => {
        state.loading = false;
      })
      .addCase(forgotpasswordverify.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotpasswordverify.fulfilled, (state, action) => {
        state.loading = false;
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(forgotpasswordverify.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
      })
  },
});

export { signinWithToken, signin, signupverify, forgotpasswordverify, signout, signup };

export default authSlice.reducer;
