import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./App.css";
// import { AuthProvider } from "./context/AuthContext"; // AuthProvider is not explicitly used here, typically Redux handles this.

// Import new route protection components
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";

import ScrollToTop from "./components/ScrollToTop";

// Unauthenticated Pages
import Signin from "@/auth/signin/Signin";
import Signup from "@/auth/signup/Signup";
import SetUp from "./auth/AccountSetUp/SetUp";
import PasswordReset from "./auth/forgottenPassword/PasswordReset";

// Authenticated Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Campaigns from "./pages/Campaigns/Campaigns";
import CampaignManager from "@/Components/CampaignManager";
import SmsCampaign from "./pages/Campaigns/SMSCampaign/SmsCampaign";
import WhatsAppMessageCreation from "./pages/Campaigns/WhatsAppCampaign/WhatsAppMessageCreation";
import WhatsAppCampaign from "./pages/Campaigns/WhatsAppCampaign/WhatsAppCampaign";
import MessageCreation from "./pages/Campaigns/SMSCampaign/MessageCreation";
import Contact from "./pages/Contact/Contact";
import Analytics from "./pages/Analytics/Analytics";
import Setting from "./pages/Settings/Setting";
import Wallet from "./pages/Wallet/Wallet";
import Notification from "./pages/Notification/Notification";
import Groups from "./pages/Groups/Groups";
import CampaignPage from "./pages/Campaigns/EmailCampaign"; // Email Campaign
import Home from "./pages/Campaigns/Email/page"; // Campaign Template Home
import KYCVerification from "./pages/Kyc/KYCVerification";

// Landing Page & Sub-Pages
import LandingPage from "./UnauthenticatedPages/Home/LandingPage";
import ApiDocumentation from "./UnauthenticatedPages/Home/APIDocumentation";
import HomeLandingPage from "./UnauthenticatedPages/Home/HomeLandingPage";
import ContactUs from "./UnauthenticatedPages/Contact/ContactUs";
import About from "./UnauthenticatedPages/About/About";
import UseCases from "./UnauthenticatedPages/UseCases/UseCases";
import Community from "./UnauthenticatedPages/Community/Community";
import PrivacyPolicy from "./UnauthenticatedPages/PrivacyPolicy/PrivacyPolicy";
import ServiceAgreement from "./UnauthenticatedPages/ServiceAgreement/ServiceAgreement";
import CodeOfConduct from "./UnauthenticatedPages/CodeOfConduct/CodeOfConduct";
import TermsAndCondition from "./UnauthenticatedPages/TermsAndCondition/TermsAndCondition";
import WhatsAppPage from "./pages/Home/WhatsAppPage"; // Assuming this is also public
import EmailPage from "./pages/Home/EmailPage"; // Assuming this is also public
import SMSPage from "./pages/Home/SMSPage"; // Assuming this is also public
import Index from "./pages/Home/Index"; // Assuming this is a public home page
import UseCasesPage from "./pages/Home/UseCasePage"; // Assuming this is public
import ApiHome from "./pages/Home/APIHome"; // Assuming this is public

import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/redux/slice/authSlice";
import { Toaster } from 'sonner';

// AuthenticatedLayout component definition (remains mostly the same)
const AuthenticatedLayout = ({
  toggleSidebar,
  isSidebarOpen,
  handleLogout, // Passed down for explicit logout button within dashboard
}) => (
  <div className="h-[100vh] overflow-hidden flex relative">
    {isSidebarOpen && (
      <div
        className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
        onClick={toggleSidebar}
      />
    )}

    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out fixed md:relative z-30 h-full `}
    >
      <Sidebar toggleSidebar={toggleSidebar} />
    </div>

    <div className="flex-1 overflow-y-scroll">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      {/* Routes within the authenticated layout should not have leading slashes if parent is /* */}
      <Routes>
        <Route
          path="overview"
          element={<Dashboard handleLogout={handleLogout} />}
        />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="contacts" element={<Contact />} />
        <Route path="campaigns/email" element={<CampaignPage />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Setting />} />
        <Route path="settings/kyc" element={<KYCVerification />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="groups" element={<Groups />} />
        <Route path="notifications" element={<Notification />} />
        <Route path="campaigns/smsCampaign" element={<SmsCampaign />} />
        <Route path="campaigns/template" element={<Home />} />
        <Route
          path="campaigns/WhatsApp-campaign"
          element={<WhatsAppCampaign />}
        />
        <Route
          path="campaigns/WhatsApp-campaign/create"
          element={<WhatsAppMessageCreation />}
        />
        <Route
          path="campaigns/smsCampaign/create"
          element={<MessageCreation />}
        />
        {/* Catch all for any invalid authenticated path, redirect to overview */}
        <Route path="*" element={<Navigate to="overview" replace />} />
      </Routes>
      {/* Assuming CampaignManager is a global component within the dashboard, adjust if needed */}
      <CampaignManager />
    </div>
  </div>
);

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();

  // Read auth token and user data from cookies on app load
  useEffect(() => {
    const token = Cookies.get("authToken");
    const userData = Cookies.get("userData");
    if (token && userData) {
      try {
        dispatch(loginSuccess(JSON.parse(userData)));
      } catch (e) {
        console.error("Failed to parse user data from cookies", e);
        // If userData is corrupted, ensure logout state
        dispatch(logout());
      }
    } else {
      // If no token or userData, ensure Redux state reflects logged out
      dispatch(logout());
    }
  }, [dispatch]);

  // Handle sidebar visibility on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get authentication status from Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Clear cookies and dispatch logout action
    Cookies.remove("authToken");
    Cookies.remove("userData");
    dispatch(logout());
    // No explicit navigate here, PublicOnlyRoute will handle redirection to /sign-in
  };

  return (
    // AuthProvider is usually for Context API, Redux handles global state
    // If AuthProvider is for something else, keep it. Otherwise, you might remove it.
    // <AuthProvider>
    <Router>
      <Toaster position="top-right" richColors />
      <ScrollToTop />
      <Routes>
        {/* PublicOnlyRoute: These pages are only accessible when NOT logged in */}
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <LandingPage />
            </PublicOnlyRoute>
          }
        >
          <Route index element={<HomeLandingPage />} />
          <Route path="features/email" element={<EmailPage />} />
          <Route path="features/whatsapp" element={<WhatsAppPage />} />
          <Route path="features/sms" element={<SMSPage />} />
          <Route path="api/docs" element={<ApiDocumentation />} />
          <Route path="api-home" element={<ApiHome />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="about-us" element={<About />} />
          <Route path="community" element={<Community />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="legal-agreement" element={<ServiceAgreement />} />
          <Route path="code-of-conduct" element={<CodeOfConduct />} />
          <Route path="terms-condition" element={<TermsAndCondition />} />
          <Route path="use_cases" element={<UseCases />} />
          {/* Catch-all for unknown paths under public landing, redirects to root public */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route
          path="/sign-in"
          element={
            <PublicOnlyRoute>
              <Signin />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicOnlyRoute>
              <PasswordReset />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/account-setup"
          element={
            <ProtectedRoute>
              <SetUp />
            </ProtectedRoute>
          }
        />

        {/* ProtectedRoute: These pages are only accessible when LOGGED IN */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                handleLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />

        {/* Fallback for unauthenticated users trying to access ANY path not covered above */}
        {/* If not authenticated, and no public route matches, redirect to /sign-in */}
        {!isAuthenticated && (
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        )}

        {/* Fallback for authenticated users trying to access ANY path not covered above */}
        {/* If authenticated, and no dashboard route matches, redirect to /dashboard/overview */}
        {isAuthenticated && (
          <Route
            path="*"
            element={<Navigate to="/dashboard/overview" replace />}
          />
        )}

        {/* Final catch-all for any scenario if previous logic doesn't trigger, should rarely be hit */}
        {/* <Route path="*" element={isAuthenticated ? <Navigate to="/dashboard/overview" replace /> : <Navigate to="/sign-in" replace />} /> */}
      </Routes>
    </Router>
    // </AuthProvider>
  );
};

export default App;
