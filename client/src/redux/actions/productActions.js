import axios from "axios";
import { server } from "../store";

export const loadProducts =
  (page = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: "loadProductsRequest" });

      const { data } = await axios.get(`${server}/products?page=${page}`, {
        withCredentials: true,
      });

      dispatch({ type: "loadProductsSuccess", payload: data });
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

export const updateProduct =
  (id, title, description, price, inStock, category) => async (dispatch) => {
    try {
      dispatch({ type: "updateProductRequest" });
      const { data } = await axios.put(
        `${server}/products/${id}`,
        {
          title,
          description,
          price,
          inStock,
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "updateProductSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "updateProductFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });
    const { data } = await axios.delete(`${server}/products/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: "deleteProductSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteProductFail",
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

export const getFeaturedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "featuredProductsRequest" });

    const { data } = await axios.get(`${server}/featured-products`);

    dispatch({
      type: "featuredProductsSuccess",
      payload: data.featuredProducts,
    });
  } catch (error) {
    dispatch({
      type: "featuredProductsFail",
      payload: error.response.data.message,
    });
  }
};

export const createFeaturedProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "createFeaturedProductRequest" });

    const { data } = await axios.post(
      `${server}/featured-product/${productId}`,
      {},
      { withCredentials: true }
    );

    dispatch({
      type: "createFeaturedProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "createFeaturedProductFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteFeaturedProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteFeaturedProductRequest" });

    const { data } = await axios.delete(
      `${server}/featured-product/${productId}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteFeaturedProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteFeaturedProductFail",
      payload: error.response.data.message,
    });
  }
};

export const getSearchProducts = (search) => async (dispatch) => {
  try {
    dispatch({ type: "searchProductsRequest" });

    const { data } = await axios.get(
      `${server}/search-products?search=${search}`
    );

    dispatch({
      type: "searchProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "searchProductsFail",
      payload: error.response.data.message,
    });
  }
};

export const getCategoryProducts =
  (category, page = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: "getCategoryProductsRequest" });

      const { data } = await axios.get(
        `${server}/products-categories/${category}?page=${page}`
      );

      dispatch({
        type: "getCategoryProductsSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "getCategoryProductsFail",
        payload: error.response.data.message,
      });
    }
  };
