import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  cart: Cookies.get("CART") ? JSON.parse(Cookies.get("CART")) : [],
  cartLength: 0,
  cartTotal: 0,
};

const TWO_HOURS = 2 / 24;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.product.id
      );

      const value = !action.payload.quantity ? 1 : action.payload.quantity;

      if (index >= 0) {
        if (
          state.cart[index].item_quantity + value <=
          action.payload.product.stock
        ) {
          state.cart[index].item_quantity += value;
          Cookies.set("CART", JSON.stringify(state.cart), { expires: TWO_HOURS });
        }
      } else {
        const tempProduct = { ...action.payload.product, item_quantity: value };
        state.cart.push(tempProduct);
        Cookies.set("CART", JSON.stringify(state.cart), { expires: TWO_HOURS });
      }
    },

    removeToCart(state, action) {
      const nextCartAfterDelete = state.cart.filter(
        (item) => item.id !== action.payload.id
      );

      state.cart = nextCartAfterDelete;
      Cookies.set("CART", JSON.stringify(state.cart), { expires: TWO_HOURS });
    },

    lessQuantity(state, action) {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cart[index].item_quantity > 1) {
        state.cart[index].item_quantity -= 1;
      } else if (state.cart[index].item_quantity === 1) {
        const nextCartAfterDelete = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = nextCartAfterDelete;
      }

      Cookies.set("CART", JSON.stringify(state.cart), { expires: TWO_HOURS });
    },

    addQuantity(state, action) {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      state.cart[index].item_quantity += 1;
      Cookies.set("CART", JSON.stringify(state.cart), { expires: TWO_HOURS });
    },

    clearCart(state) {
      state.cart = [];
      Cookies.remove("CART");
    },

    priceTotal(state) {
      let { total, quantity } = state.cart.reduce(
        (cartTotal, item) => {
          const { priceUnit, item_quantity } = item;
          const itemTotal = Number(priceUnit / 100) * item_quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += item_quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartLength = quantity;
      state.cartTotal = total;
    },
  },
});

export const {
  addToCart,
  removeToCart,
  lessQuantity,
  addQuantity,
  clearCart,
  priceTotal,
} = cartSlice.actions;

export default cartSlice.reducer;