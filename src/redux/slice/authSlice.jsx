import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

const token = Cookies.get("authToken"); // Retrieve token from cookies

const initialState = {
  isAuthenticated: !!token, // If token exists, set isAuthenticated to true
  user: token ? JSON.parse(Cookies.get("userData") || "{}") : null, // Retrieve user data
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;

      Cookies.set("authToken", action.payload.token, { expires: 7 }); // Store token for 7 days
      Cookies.set("userData", JSON.stringify(action.payload), { expires: 7 });
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;

      Cookies.remove("authToken");
      Cookies.remove("userData");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
