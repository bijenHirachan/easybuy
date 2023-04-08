import { createAction, createReducer } from "@reduxjs/toolkit";

const loadProductsRequest = createAction("loadProductsRequest");
const loadProductsSuccess = createAction("loadProductsSuccess");
const loadProductsFail = createAction("loadProductsFail");

const clearMessage = createAction("clearMessage");
const clearError = createAction("clearError");

export const productReducer = createReducer({}, (builder) => {
  builder
    .addCase(loadProductsRequest, (state) => {
      state.loading = true;
    })
    .addCase(loadProductsSuccess, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(loadProductsFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearError, (state) => {
      state.error = null;
    })
    .addCase(clearMessage, (state) => {
      state.message = null;
    });
});
