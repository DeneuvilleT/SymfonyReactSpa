import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("CART")
    ? JSON.parse(localStorage.getItem("CART"))
    : [],
  cartLength: 0,
  cartTotal: 0,
};

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
        // Rajoute 1 de valeur au produit ciblé
        if (
          state.cart[index].item_quantity + value <=
          action.payload.product.stock
        ) {
          state.cart[index].item_quantity += value;
          localStorage.setItem("CART", JSON.stringify(state.cart));
        }
      } else {
        // Rajoute 1 de valeur par défaut si le produit n'est pas dans le panier
        const tempProduct = { ...action.payload.product, item_quantity: value };
        state.cart.push(tempProduct);
        localStorage.setItem("CART", JSON.stringify(state.cart));
      }
    },

    removeToCart(state, action) {
      const nextCartAfterDelete = state.cart.filter(
        (item) => item.id !== action.payload.id
      );

      state.cart = nextCartAfterDelete;
      localStorage.setItem("CART", JSON.stringify(state.cart));
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

      localStorage.setItem("CART", JSON.stringify(state.cart));
    },

    addQuantity(state, action) {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      state.cart[index].item_quantity += 1;
      localStorage.setItem("CART", JSON.stringify(state.cart));
    },

    clearCart(state) {
      state.cart = [];
      localStorage.setItem("CART", JSON.stringify(state.cart));
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
