import { createSlice } from "@reduxjs/toolkit";

import { ReportState } from "./types";

import {
    createreporting, getreporting, getallreporting
  } from "./actions";

const initialState: ReportState = {
  report: [],
  loading: false,
}; 

export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
          .addCase(createreporting.pending, (state) => {
            state.loading = true;
          })
          .addCase(createreporting.fulfilled, (state, action) => {
            state.loading = false;
            state.report = action.payload; 
          })
          .addCase(createreporting.rejected, (state) => {
            state.loading = false;
          })
          .addCase(getreporting.pending, (state) => {
            state.loading = true;
          })
          .addCase(getreporting.fulfilled, (state, action) => {
            state.loading = false;
            state.report = action.payload; 
          })
          .addCase(getreporting.rejected, (state) => {
            state.loading = false;
          }) 
          .addCase(getallreporting.pending, (state) => {
            state.loading = true;
          })
          .addCase(getallreporting.fulfilled, (state, action) => {
            state.loading = false;
            state.report = action.payload; 
          })
          .addCase(getallreporting.rejected, (state) => {
            state.loading = false;
          }) 
    },
  });

  export { createreporting, getreporting };

export default reportSlice.reducer;