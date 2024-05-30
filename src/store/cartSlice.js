import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  cart: [],
  count:0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    toggleCartDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCartDrawer: (state) => {
      state.isOpen = true;
    },
    closeCartDrawer: (state) => {
      state.isOpen = false;
    },
    removeItem: (state, action) => {
      const { quantity } = action.payload || {};
      if (quantity) {
        state.count -= quantity;
        if (state.count < 0) {
          state.count = 0; // Reset count to 0 if it goes negative
        }
      }
    },
    addToCart(state, action) {
      const product = action.payload;
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
        state.count++;
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const product = state.cart.find(item => item.id === action.payload);
      if (product) {
        product.quantity += 1;
        state.count++
      }
    },
    decreaseQuantity(state, action) {
      const product = state.cart.find(item => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        state.count--
      }
    },
  },
});

export const { setProducts, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, toggleCartDrawer, closeCartDrawer, openCartDrawer, removeItem } = cartSlice.actions;
export default cartSlice.reducer;