import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import Cookies
import "./App.css";

import Signin from "@/auth/signin/Signin";
import Signup from "@/auth/signup/Signup";
import SetUp from "./auth/AccountSetUp/SetUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import PasswordReset from "./auth/forgottenPassword/PasswordReset";

import Campaigns from "./pages/Campaigns/Campaigns";
import Contact from "./pages/Contact/Contact";
import Analytics from "./pages/Analytics/Analytics";
import Setting from "./pages/Settings/Setting";
import Wallet from "./pages/Wallet/Wallet";
import Notification from "./pages/Notification/Notification";
import Groups from "./pages/Groups/Groups";

import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/redux/slice/authSlice";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();

  // Load authentication state on mount
  useEffect(() => {
    const token = Cookies.get("authToken");
    const userData = Cookies.get("userData");

    if (token && userData) {
      dispatch(loginSuccess(JSON.parse(userData))); // Restore authentication state
    }
  }, [dispatch]);

  // Handle sidebar visibility based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {!isAuthenticated ? (
          <>
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/account-setup" element={<SetUp />} />
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </>
        ) : (
          // Authenticated Layout
          <Route
            path="/*"
            element={
              <div className="h-[100vh] overflow-hidden flex relative">
                {/* Overlay for mobile */}
                {isSidebarOpen && (
                  <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={() => setIsSidebarOpen(false)}
                  />
                )}

                {/* Sidebar with responsive positioning */}
                <div
                  className={`${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                  } transition-transform duration-300 ease-in-out fixed md:relative z-30 h-full`}
                >
                  <Sidebar />
                </div>

                <div className="flex-1 overflow-y-scroll">
                  <Navbar
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                  />
                  <Routes>
                    <Route
                      path="/"
                      element={<Dashboard handleLogout={handleLogout} />}
                    />
                    <Route path="/campaigns" element={<Campaigns />} />
                    <Route path="/contacts" element={<Contact />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Setting />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/notifications" element={<Notification />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </div>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
