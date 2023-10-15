import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cart: localStorage.getItem("CART") ? JSON.parse(localStorage.getItem("CART")) : [],
   cartLength: 0,
   cartTotal: 0,
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {

      addToCart(state, action) {
         const index = state.cart.findIndex(item => item.id === action.payload.id);

         if (index >= 0) {
            state.cart[index].item_quantity += 1;

         } else {
            const tempProduct = { ...action.payload, item_quantity: 1 }
            state.cart.push(tempProduct);
         }
         localStorage.setItem("CART", JSON.stringify(state.cart));
      },

      removeToCart(state, action) {
         const nextCartAfterDelete = state.cart.filter(item => item.id !== action.payload.id);

         state.cart = nextCartAfterDelete;
         localStorage.setItem("CART", JSON.stringify(state.cart))
      },

      lessQuantity(state, action) {
         const index = state.cart.findIndex(item => item.id === action.payload.id);

         if (state.cart[index].item_quantity > 1) {
            state.cart[index].item_quantity -= 1;

         } else if (state.cart[index].item_quantity === 1) {

            const nextCartAfterDelete = state.cart.filter(item => item.id !== action.payload.id);
            state.cart = nextCartAfterDelete;
         }

         localStorage.setItem("CART", JSON.stringify(state.cart));
      },

      addQuantity(state, action) {
         const index = state.cart.findIndex(item => item.id === action.payload.id);

         state.cart[index].item_quantity += 1;
         localStorage.setItem("CART", JSON.stringify(state.cart));
      },

      clearCart(state) {
         state.cart = [];
         localStorage.setItem("CART", JSON.stringify(state.cart));
      },

      priceTotal(state) {
         let { total, quantity } = state.cart.reduce((cartTotal, item) => {
            const { price, item_quantity } = item;
            const itemTotal = price * item_quantity;

            cartTotal.total += itemTotal;
            cartTotal.quantity += item_quantity;

            return cartTotal;
         }, {
            total: 0,
            quantity: 0
         });

         state.cartLength = quantity;
         state.cartTotal = total;
      }
   }
});


export const { addToCart, removeToCart, lessQuantity, addQuantity, clearCart, priceTotal } = cartSlice.actions;

export default cartSlice.reducer;