import axios from "axios";
import { server } from "../store";

export const loadProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "loadProductsRequest" });

    const { data } = await axios.get(`${server}/products`, {
      withCredentials: true,
    });

    dispatch({ type: "loadProductsSuccess", payload: data.products });
  } catch (error) {
    dispatch({
      type: "loadProductsFail",
      payload: error.response.data.message,
    });
  }
};

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "createProductRequest" });

    const { data } = await axios.post(`${server}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({ type: "createProductSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createProductFail",
      payload: error.response.data.message,
    });
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getSingleProductRequest" });

    const { data } = await axios.get(`${server}/products/${id}`);

    dispatch({ type: "getSingleProductSuccess", payload: data.product });
  } catch (error) {
    dispatch({
      type: "getSingleProductFail",
      payload: error.response.data.message,
    });
  }
};
