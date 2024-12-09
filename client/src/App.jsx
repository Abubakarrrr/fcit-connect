import { useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { Toaster } from "./components/ui/toaster";
import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/Home";
import Navbar from "@/components/shared/Navbar";
import SignUp from "@/components/Forms/SignUp";
import Login from "@/components/Forms/Login";
import Footer from "./components/shared/Footer";
import EmailVerify from "@/components/Forms/EmailVerify";
import ForgotPassowrd from "@/components/Forms/ForgotPassowrd";
import ResetPassword from "@/components/Forms/ResetPassword";
import PageNotFound from "@/components/shared/PageNoFound";
import { useAuthStore } from "@/store/authStore";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import UserProfile from "./components/Forms/UserProfile";

// protected routes
const ProtectedRoute = ({ children }) => {
  const { isAthenticated, user } = useAuthStore();

  if (!isAthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

// redirect authenticated users to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAthenticated, user } = useAuthStore();

  if (isAthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};
function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <Analytics/> */}
      <Toaster />
      <Router>
        <div className="font-primary">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                // <ProtectedRoute>
                  <Home />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                // <RedirectAuthenticatedUser>
                  <SignUp />
                // </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/login"
              element={
                // <RedirectAuthenticatedUser>
                  <Login />
                // </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/verify-email"
              element={
                // <RedirectAuthenticatedUser>
                  <EmailVerify />
                // </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/forgot-password"
              element={
                // <RedirectAuthenticatedUser>
                  <ForgotPassowrd />
                // </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/reset-password/:token"
              element={
                // <RedirectAuthenticatedUser>
                  <ResetPassword />
                // </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/profile"
              element={
                // <ProtectedRoute>
                  <UserProfile />
                // </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
