import { configureStore } from "@reduxjs/toolkit";
import {
  adminReducer,
  newsletterReducer,
  userReducer,
} from "./reducers/userReducer";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { categoryReducer } from "./reducers/categoryReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    admin: adminReducer,
    cart: cartReducer,
    category: categoryReducer,
    newsletter: newsletterReducer,
  },
});

export default store;

// export const server = "http://localhost:5000/api/v1";
// export const server = "https://easybuy-backend.onrender.com/api/v1";
export const server = "https://tiny-lime-raven-cuff.cyclic.app/api/v1";
