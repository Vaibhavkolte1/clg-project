import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

const preloadedState = {
  user: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: null,
  },
};

export const store = configureStore({
  reducer: { user: userReducer },
  preloadedState,
});