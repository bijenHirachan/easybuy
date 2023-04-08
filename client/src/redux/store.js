import { configureStore } from "@reduxjs/toolkit";
import { adminReducer, userReducer } from "./reducers/userReducer";
import { productReducer } from "./reducers/productReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    admin: adminReducer,
  },
});

export default store;

export const server = "http://localhost:5000/api/v1";
