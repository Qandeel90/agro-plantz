import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from "../constants";

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
export const increaseQuantity = (payload) => {
  return {
    type: INCREASE_QUANTITY,
    payload,
  };
};
export const decreaseQuantity = (payload) => {
  return {
    type: DECREASE_QUANTITY,
    payload,
  };
};
