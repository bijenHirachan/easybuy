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
