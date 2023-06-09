import axios from "axios";
import { server } from "../store";

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });
    const { data } = await axios.post(`${server}/users`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "registerFail", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });
    const { data } = await axios.get(`${server}/me`, {
      withCredentials: true,
    });
    dispatch({ type: "loadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.message });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });
    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: "logoutSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message });
  }
};

export const changePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "changePasswordRequest" });
      const { data } = await axios.put(
        `${server}/changepassword`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "changePasswordSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "changePasswordFail",
        payload: error.response.data.message,
      });
    }
  };

export const updateProfile = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });
    const { data } = await axios.put(
      `${server}/updateprofile`,
      { name, email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProfileFail",
      payload: error.response.data.message,
    });
  }
};

export const updateAvatar = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateAvatarRequest" });
    const { data } = await axios.put(
      `${server}/updateprofilepicture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        credentials: "include",
      }
    );
    dispatch({ type: "updateAvatarSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateAvatarFail",
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgotPasswordRequest" });
    const { data } = await axios.post(
      `${server}/forgotpassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "forgotPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFail",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (password, token) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordRequest" });
    const { data } = await axios.put(
      `${server}/resetpassword/${token}`,
      { password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "resetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "resetPasswordFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers =
  (page = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: "getAllUsersRequest" });

      const { data } = await axios.get(`${server}/users?page=${page}`);

      dispatch({ type: "getAllUsersSuccess", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "getAllUsersFail",
        payload: error.response.data.message,
      });
    }
  };

export const updateUserRole = (id) => async (dispatch) => {
  try {
    dispatch({ type: "updateUserRoleRequest" });

    const { data } = await axios.put(
      `${server}/users/${id}`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch({ type: "updateUserRoleSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateUserRoleFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserRequest" });

    const { data } = await axios.delete(`${server}/users/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: "deleteUserSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteUserFail",
      payload: error.response.data.message,
    });
  }
};

export const subscribeNewsletter = (email) => async (dispatch) => {
  try {
    dispatch({ type: "newsletterRequest" });

    const { data } = await axios.post(
      `${server}/subscribe`,
      { email },
      {
        headers: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      }
    );

    dispatch({ type: "newsletterSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "newsletterFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllOrdersRequest" });

    const { data } = await axios.get(`${server}/orders`, {
      withCredentials: true,
    });

    dispatch({ type: "getAllOrdersSuccess", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "getAllOrdersFail",
      payload: error.response.data.message,
    });
  }
};

export const changeDeliveryStatus = (id) => async (dispatch) => {
  try {
    dispatch({ type: "changeDeliveryStatusRequest" });

    const { data } = await axios.put(
      `${server}/orders/${id}`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch({ type: "changeDeliveryStatusSuccess", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "changeDeliveryStatusFail",
      payload: error.response.data.message,
    });
  }
};
