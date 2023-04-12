import { createAction, createReducer } from "@reduxjs/toolkit";

const createCategoryRequest = createAction("createCategoryRequest");
const createCategorySuccess = createAction("createCategorySuccess");
const createCategoryFail = createAction("createCategoryFail");

const updateCategoryRequest = createAction("updateCategoryRequest");
const updateCategorySuccess = createAction("updateCategorySuccess");
const updateCategoryFail = createAction("updateCategoryFail");

const deleteCategoryRequest = createAction("deleteCategoryRequest");
const deleteCategorySuccess = createAction("deleteCategorySuccess");
const deleteCategoryFail = createAction("deleteCategoryFail");

const getAllCategoriesRequest = createAction("getAllCategoriesRequest");
const getAllCategoriesSuccess = createAction("getAllCategoriesSuccess");
const getAllCategoriesFail = createAction("getAllCategoriesFail");

const clearMessage = createAction("clearMessage");
const clearError = createAction("clearError");

export const categoryReducer = createReducer({}, (builder) => {
  builder
    .addCase(createCategoryRequest, (state) => {
      state.loading = true;
    })
    .addCase(createCategorySuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(createCategoryFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateCategoryRequest, (state) => {
      state.loading = true;
    })
    .addCase(updateCategorySuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateCategoryFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteCategoryRequest, (state) => {
      state.loading = true;
    })
    .addCase(deleteCategorySuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteCategoryFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getAllCategoriesRequest, (state) => {
      state.loading = true;
    })
    .addCase(getAllCategoriesSuccess, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    })
    .addCase(getAllCategoriesFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearError, (state) => {
      state.loading = false;
      state.error = null;
    })
    .addCase(clearMessage, (state) => {
      state.loading = false;
      state.message = null;
    });
});
