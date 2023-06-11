import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from "../constants";

const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case REMOVE_FROM_CART:
      return state.filter((cartItem) => cartItem !== action.payload);
    case CLEAR_CART:
      return (state = []);
    case INCREASE_QUANTITY:
      //increase quantity of item
      return state.map((cartItem) => {
        if (cartItem.product.id === action.payload.product.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        } else {
          return cartItem;
        }
      });

    case DECREASE_QUANTITY:
      //decrease quantity of item
      return state.map((cartItem) => {
        if (cartItem.product.id === action.payload.product.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          };
        } else {
          return cartItem;
        }
      });
    default:
      return state;
  }
};

export default cartItems;
