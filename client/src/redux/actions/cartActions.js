export const addToCart = (product, quantity) => (dispatch, getState) => {
  const item = { ...product, quantity };
  dispatch({ type: "addItem", payload: item });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (item) => (dispatch, getState) => {
  dispatch({ type: "removeItem", payload: item });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const updateItemsInWishlist = (item) => (dispatch, getState) => {
  dispatch({ type: "updateWishlist", payload: item });
  localStorage.setItem("wishlist", JSON.stringify(getState().cart.wishlist));
};

export const emptyCart = () => (dispatch) => {
  localStorage.removeItem("cartItems");
  dispatch({ type: "emptyCart" });
};
