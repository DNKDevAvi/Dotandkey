import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { initialState as cartInitialState } from './cartSlice';

// Function to load persisted state from localStorage
const loadState = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return undefined;
    }
    // Parse the stored cart slice object.
    return JSON.parse(serializedCart);
  } catch (error) {
    console.error("Failed to load cart state from localStorage:", error);
    return undefined;
  }
};

const persistedCart = loadState();

// Merge the persisted state with the default initial state.
const preloadedState = {
  cart: {
    ...cartInitialState,
    ...persistedCart,
  },
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

// Subscribe to store changes and save the cart slice to localStorage.
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('cart', JSON.stringify(state.cart));
  } catch (error) {
    console.error("Failed to save cart state to localStorage:", error);
  }
});

export default store;
