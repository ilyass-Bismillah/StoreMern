import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "./../utils/updateState";

const getInitialCart = () => {
  try {
    const stored = localStorage.getItem("cart");
    return stored
      ? JSON.parse(stored)
      : {
          cartItems: [],
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
          shippingAddress: {},
          paymentMethod: "PayPal",
        };
  } catch {
    return {
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
      shippingAddress: {},
      paymentMethod: "PayPal",
    };
  }
};

const initialState = getInitialCart();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const incomingQty = Number(item.qty) || 1;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        existItem.qty = incomingQty;
      } else {
        state.cartItems.push({ ...item, qty: incomingQty });
      }
      updateCart(state);
    },

    removeItem(state, action) {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      updateCart(state);
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      updateCart(state);
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      updateCart(state);
    },
    clearCart(state) {
      state.cartItems = [];
      updateCart(state);
    },
    resetCart(state) {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
      state.shippingAddress = {};
      state.paymentMethod = "PayPal";
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeItem,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
