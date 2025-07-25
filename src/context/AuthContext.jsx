import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token on mount
    const token = Cookies.get("authToken");
    const userData = Cookies.get("userData");
    const storedUserDetails = localStorage.getItem("userDetails");

    if (token && (userData || storedUserDetails)) {
      const userInfo = storedUserDetails ? JSON.parse(storedUserDetails) : JSON.parse(userData);
      setUser(userInfo);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      console.log("Login response:", response);

      // Check for error messages in the response
      if (response.err_msg) {
        throw { err_msg: response.err_msg };
      }

      // Store accessToken and user details
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("userDetails", JSON.stringify(response.userDetails));
        Cookies.set("authToken", response.accessToken);
        Cookies.set("userData", JSON.stringify(response.userDetails));
        setUser(response.userDetails);
      }
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      console.log("Registration response:", response);

      // Check for error messages in the response
      if (response.err_msg) {
        throw { err_msg: response.err_msg };
      }

      // Store accessToken in localStorage if present
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
      }

      if (response.accessToken) {
        Cookies.set("authToken", response.accessToken);
        Cookies.set("userData", JSON.stringify(userData));
        setUser(userData);
      }
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const verifyOTP = async (otp) => {
    try {
      const response = await authAPI.verifyOTP(otp);
      console.log("OTP verification response:", response);

      // Check for error messages in the response
      if (response.err_msg) {
        throw { err_msg: response.err_msg };
      }

      return response;
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  };

  const completeProfile = async (profileData) => {
    try {
      const response = await authAPI.completeProfile(profileData);
      console.log("Profile completion response:", response);

      // Check for error messages in the response
      if (response.err_msg) {
        throw { err_msg: response.err_msg };
      }

      // Update user data with profile information
      if (response.msg === "") {
        const updatedUserData = { ...user, ...profileData };
        Cookies.set("userData", JSON.stringify(updatedUserData));
        setUser(updatedUserData);
      }

      return response;
    } catch (error) {
      console.error("Profile completion error:", error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userData");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    verifyOTP,
    completeProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
