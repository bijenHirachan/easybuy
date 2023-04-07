import { createAction, createReducer } from "@reduxjs/toolkit";

const registerRequest = createAction("registerRequest");
const registerSuccess = createAction("registerSuccess");
const registerFail = createAction("registerFail");

const loadUserRequest = createAction("loadUserRequest");
const loadUserSuccess = createAction("loadUserSuccess");
const loadUserFail = createAction("loadUserFail");

const loginRequest = createAction("loginRequest");
const loginSuccess = createAction("loginSuccess");
const loginFail = createAction("loginFail");

const logoutRequest = createAction("logoutRequest");
const logoutSuccess = createAction("logoutSuccess");
const logoutFail = createAction("logoutFail");

const clearMessage = createAction("clearMessage");
const clearError = createAction("clearError");

export const userReducer = createReducer({}, (builder) => {
  builder
    .addCase(loginRequest, (state) => {
      state.loading = true;
    })
    .addCase(loginSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(loginFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(logoutRequest, (state) => {
      state.loading = true;
    })
    .addCase(logoutSuccess, (state, action) => {
      state.loading = false;
      state.user = null;
      state.message = action.payload;
      state.isAuthenticated = false;
    })
    .addCase(logoutFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(loadUserRequest, (state) => {
      state.loading = true;
    })
    .addCase(loadUserSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(loadUserFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(registerRequest, (state) => {
      state.loading = true;
    })
    .addCase(registerSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(registerFail, (state, action) => {
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
