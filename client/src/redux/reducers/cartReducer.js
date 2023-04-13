import { createAction, createReducer } from "@reduxjs/toolkit";

export const addItem = createAction("addItem");
export const calculateTotal = createAction("calculateTotal");
export const removeItem = createAction("removeItem");
export const updateWishlist = createAction("updateWishlist");
export const emptyCart = createAction("emptyCart");

export const cartReducer = createReducer(
  {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    wishlist: localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [],
  },
  (builder) => {
    builder
      .addCase(addItem, (state, action) => {
        const item = action.payload;
        const itemExist = state.cartItems.find((it) => it._id === item._id);

        if (itemExist) {
          state.cartItems = state.cartItems.map((i) =>
            i._id === itemExist._id ? item : i
          );
        } else {
          state.cartItems = [...state.cartItems, item];
        }
      })
      .addCase(removeItem, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(updateWishlist, (state, action) => {
        const item = action.payload;
        const itemExist = state.wishlist.find((it) => it._id === item._id);

        if (itemExist) {
          state.wishlist = state.wishlist.filter((i) => i._id !== item._id);
        } else {
          state.wishlist = [...state.wishlist, item];
        }
      })
      .addCase(emptyCart, (state, action) => {
        state.cartItems = [];
      });
  }
);
