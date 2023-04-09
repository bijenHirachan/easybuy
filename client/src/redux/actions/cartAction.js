export const addToCart = (product, quantity) => (dispatch, getState) => {
  const item = { ...product, quantity };
  dispatch({ type: "addItem", payload: item });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
