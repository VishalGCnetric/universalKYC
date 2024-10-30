// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
// import yourReducer from './yourSlice'; // replace with your slice file

const store = configureStore({
  reducer: {
    // yourState: yourReducer, // replace with your slice
  },
});

export default store;
