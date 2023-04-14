import { createAction, createReducer } from "@reduxjs/toolkit";

const getAllUsersRequest = createAction("getAllUsersRequest");
const getAllUsersSuccess = createAction("getAllUsersSuccess");
const getAllUsersFail = createAction("getAllUsersFail");

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

const changePasswordRequest = createAction("changePasswordRequest");
const changePasswordSuccess = createAction("changePasswordSuccess");
const changePasswordFail = createAction("changePasswordFail");

const updateProfileRequest = createAction("updateProfileRequest");
const updateProfileSuccess = createAction("updateProfileSuccess");
const updateProfileFail = createAction("updateProfileFail");

const updateAvatarRequest = createAction("updateAvatarRequest");
const updateAvatarSuccess = createAction("updateAvatarSuccess");
const updateAvatarFail = createAction("updateAvatarFail");

const forgotPasswordRequest = createAction("forgotPasswordRequest");
const forgotPasswordSuccess = createAction("forgotPasswordSuccess");
const forgotPasswordFail = createAction("forgotPasswordFail");

const resetPasswordRequest = createAction("resetPasswordRequest");
const resetPasswordSuccess = createAction("resetPasswordSuccess");
const resetPasswordFail = createAction("resetPasswordFail");

const clearMessage = createAction("clearMessage");
const clearError = createAction("clearError");

export const userReducer = createReducer({}, (builder) => {
  builder
    .addCase(getAllUsersRequest, (state) => {
      state.loading = true;
    })
    .addCase(getAllUsersSuccess, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.totalPages = action.payload.totalPages;
    })
    .addCase(getAllUsersFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(resetPasswordRequest, (state) => {
      state.loading = true;
    })
    .addCase(resetPasswordSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(resetPasswordFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(forgotPasswordRequest, (state) => {
      state.loading = true;
    })
    .addCase(forgotPasswordSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(forgotPasswordFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateAvatarRequest, (state) => {
      state.loading = true;
    })
    .addCase(updateAvatarSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateAvatarFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(changePasswordRequest, (state) => {
      state.loading = true;
    })
    .addCase(changePasswordSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(changePasswordFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateProfileRequest, (state) => {
      state.loading = true;
    })
    .addCase(updateProfileSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateProfileFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(loginRequest, (state) => {
      state.loading = true;
    })
    .addCase(loginSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
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
      state.user = action.payload.user;
      state.message = action.payload.message;
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

const updateUserRoleRequest = createAction("updateUserRoleRequest");
const updateUserRoleSuccess = createAction("updateUserRoleSuccess");
const updateUserRoleFail = createAction("updateUserRoleFail");
const deleteUserRequest = createAction("deleteUserRequest");
const deleteUserSuccess = createAction("deleteUserSuccess");
const deleteUserFail = createAction("deleteUserFail");

const getAllOrdersRequest = createAction("getAllOrdersRequest");
const getAllOrdersSuccess = createAction("getAllOrdersSuccess");
const getAllOrdersFail = createAction("getAllOrdersFail");

const changeDeliveryStatusRequest = createAction("changeDeliveryStatusRequest");
const changeDeliveryStatusSuccess = createAction("changeDeliveryStatusSuccess");
const changeDeliveryStatusFail = createAction("changeDeliveryStatusFail");

export const adminReducer = createReducer({}, (builder) => {
  builder
    .addCase(changeDeliveryStatusRequest, (state) => {
      state.loading = true;
    })
    .addCase(changeDeliveryStatusSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(changeDeliveryStatusFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getAllOrdersRequest, (state) => {
      state.loading = true;
    })
    .addCase(getAllOrdersSuccess, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(getAllOrdersFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteUserRequest, (state) => {
      state.loading = true;
    })
    .addCase(deleteUserSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteUserFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateUserRoleRequest, (state) => {
      state.loading = true;
    })
    .addCase(updateUserRoleSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateUserRoleFail, (state, action) => {
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

const newsletterRequest = createAction("newsletterRequest");
const newsletterSuccess = createAction("newsletterSuccess");
const newsletterFail = createAction("newsletterFail");

export const newsletterReducer = createReducer({}, (builder) => {
  builder
    .addCase(newsletterRequest, (state) => {
      state.loading = true;
    })
    .addCase(newsletterSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(newsletterFail, (state, action) => {
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
