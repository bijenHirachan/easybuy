import { createAction, createReducer } from "@reduxjs/toolkit";

export const addItem = createAction("addItem");
export const removeItem = createAction("addItem");

export const cartReducer = createReducer(
  {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  (builder) => {
    builder.addCase(addItem, (state, action) => {
      const item = action.payload;
      const itemExist = state.cartItems.find((it) => it._id === item._id);

      if (itemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === itemExist._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    });
    //   .addCase(removeItem, (state, action) => {
    //     state.cart = state.cart.filter(
    //       (item) => item._id !== action.payload._id
    //     );
    //   });
  }
);
