import axios from "axios";
import { server } from "../store";

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllCategoriesRequest" });

    const { data } = await axios.get(`${server}/categories`);

    dispatch({ type: "getAllCategoriesSuccess", payload: data.categories });
  } catch (error) {
    dispatch({
      type: "getAllCategoriesFail",
      payload: error.response.data.message,
    });
  }
};

export const createCategory = (title) => async (dispatch) => {
  try {
    dispatch({ type: "createCategoryRequest" });

    const { data } = await axios.post(
      `${server}/categories`,
      { title },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({ type: "createCategorySuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createCategoryFail",
      payload: error.response.data.message,
    });
  }
};

export const updateCategory = (id, title) => async (dispatch) => {
  try {
    dispatch({ type: "updateCategoryRequest" });

    const { data } = await axios.put(
      `${server}/categories/${id}`,
      { title },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({ type: "updateCategorySuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateCategoryFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteCategoryRequest" });

    const { data } = await axios.delete(`${server}/categories/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: "deleteCategorySuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteCategoryFail",
      payload: error.response.data.message,
    });
  }
};
