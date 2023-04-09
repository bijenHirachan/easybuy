import { createAction, createReducer } from "@reduxjs/toolkit";

const loadProductsRequest = createAction("loadProductsRequest");
const loadProductsSuccess = createAction("loadProductsSuccess");
const loadProductsFail = createAction("loadProductsFail");

const getSingleProductRequest = createAction("getSingleProductRequest");
const getSingleProductSuccess = createAction("getSingleProductSuccess");
const getSingleProductFail = createAction("getSingleProductFail");

const createProductRequest = createAction("createProductRequest");
const createProductSuccess = createAction("createProductSuccess");
const createProductFail = createAction("createProductFail");

const clearMessage = createAction("clearMessage");
const clearError = createAction("clearError");

export const productReducer = createReducer({}, (builder) => {
  builder
    .addCase(getSingleProductRequest, (state) => {
      state.loading = true;
    })
    .addCase(getSingleProductSuccess, (state, action) => {
      state.loading = false;
      state.singleProduct = action.payload;
    })
    .addCase(getSingleProductFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(createProductRequest, (state) => {
      state.loading = true;
    })
    .addCase(createProductSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(createProductFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
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
