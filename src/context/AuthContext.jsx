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

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      console.log("Registration response:", response);

      // Check for error messages in the response
      if (response.err_msg) {
        throw { err_msg: response.err_msg };
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
