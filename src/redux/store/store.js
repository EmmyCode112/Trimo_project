import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import imageReducer from "../imageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    image: imageReducer,
  },
});

export default store;
