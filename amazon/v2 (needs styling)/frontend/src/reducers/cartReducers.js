/* eslint-disable import/prefer-default-export */
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_EMPTY,
  CART_ADD_ITEM_FAIL,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: 'paypal' },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM_FAIL:
      return { ...state, error: action.payload };
    case CART_ADD_ITEM: {
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          ...state,
          error: '',
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return {
        ...state,
        error: '',
        cartItems: [...state.cartItems, item],
      };
    }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        error: '',
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_EMPTY:
      return {
        ...state,
        error: '',
        cartItems: [],
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};
