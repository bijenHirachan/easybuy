import { createAction, createReducer } from "@reduxjs/toolkit";

const searchProductsRequest = createAction("searchProductsRequest");
const searchProductsSuccess = createAction("searchProductsSuccess");
const searchProductsFail = createAction("searchProductsFail");

const getCategoryProductsRequest = createAction("getCategoryProductsRequest");
const getCategoryProductsSuccess = createAction("getCategoryProductsSuccess");
const getCategoryProductsFail = createAction("getCategoryProductsFail");

const loadProductsRequest = createAction("loadProductsRequest");
const loadProductsSuccess = createAction("loadProductsSuccess");
const loadProductsFail = createAction("loadProductsFail");

const featuredProductsRequest = createAction("featuredProductsRequest");
const featuredProductsSuccess = createAction("featuredProductsSuccess");
const featuredProductsFail = createAction("featuredProductsFail");

const createFeaturedProductRequest = createAction(
  "createFeaturedProductRequest"
);
const createFeaturedProductSuccess = createAction(
  "createFeaturedProductSuccess"
);
const createFeaturedProductFail = createAction("createFeaturedProductFail");

const deleteFeaturedProductRequest = createAction(
  "deleteFeaturedProductRequest"
);
const deleteFeaturedProductSuccess = createAction(
  "deleteFeaturedProductSuccess"
);
const deleteFeaturedProductFail = createAction("deleteFeaturedProductFail");

const getSingleProductRequest = createAction("getSingleProductRequest");
const getSingleProductSuccess = createAction("getSingleProductSuccess");
const getSingleProductFail = createAction("getSingleProductFail");

const createProductRequest = createAction("createProductRequest");
const createProductSuccess = createAction("createProductSuccess");
const createProductFail = createAction("createProductFail");

const updateProductRequest = createAction("updateProductRequest");
const updateProductSuccess = createAction("updateProductSuccess");
const updateProductFail = createAction("updateProductFail");

const deleteProductRequest = createAction("deleteProductRequest");
const deleteProductSuccess = createAction("deleteProductSuccess");
const deleteProductFail = createAction("deleteProductFail");

const clearMessage = createAction("clearMessage");
const clearError = createAction("clearError");
const clearSearchProducts = createAction("clearSearchProducts");

export const productReducer = createReducer({}, (builder) => {
  builder
    .addCase(getCategoryProductsRequest, (state) => {
      state.loading = true;
    })
    .addCase(getCategoryProductsSuccess, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
    })
    .addCase(getCategoryProductsFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(searchProductsRequest, (state) => {
      state.loading = true;
    })
    .addCase(searchProductsSuccess, (state, action) => {
      state.loading = false;
      state.searchProducts = action.payload;
    })
    .addCase(searchProductsFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
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
    .addCase(updateProductRequest, (state) => {
      state.loading = true;
    })
    .addCase(updateProductSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateProductFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteProductRequest, (state) => {
      state.loading = true;
    })
    .addCase(deleteProductSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteProductFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(featuredProductsRequest, (state) => {
      state.loading = true;
    })
    .addCase(featuredProductsSuccess, (state, action) => {
      state.loading = false;
      state.featuredProducts = action.payload;
    })
    .addCase(featuredProductsFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(createFeaturedProductRequest, (state) => {
      state.loading = true;
    })
    .addCase(createFeaturedProductSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(createFeaturedProductFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteFeaturedProductRequest, (state) => {
      state.loading = true;
    })
    .addCase(deleteFeaturedProductSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteFeaturedProductFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(loadProductsRequest, (state) => {
      state.loading = true;
    })
    .addCase(loadProductsSuccess, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
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
    })
    .addCase(clearSearchProducts, (state) => {
      state.searchProducts = null;
    });
});
