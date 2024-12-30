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
import { Login,SignUp, ForgotPassowrd,ResetPassword, UserProfile,EmailVerify } from "./components/Forms";
import {Navbar,Footer,PageNotFound,LoadingSpinner} from "./components/shared";
import { AdminLayout, UserLayout } from "./layouts";
import Home from "@/pages/Home";
import { useAuthStore } from "@/store/authStore";
import FypDetails from "./pages/fyp/FypDetails";

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
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isUserRoute = location.pathname.startsWith("/user");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <Analytics/> */}
      <Toaster />
      <Router>
        <div className="font-primary">
          {!isAdminRoute && !isUserRoute && <Navbar />}
          <Routes>
            {/* Public Routes  */}
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
            <Route
              path="/loginwithgoogle"
              element={
                <></>
              }
            />
            <Route path="/fyps/:batch/:fypName/:id" element={<FypDetails/>} />  

            {/* Admin Routes  */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="" element={<h1>dashboard</h1>} />
              <Route path="users" element={<h1>users</h1>} />
              <Route path="fyps" element={<h1>fyps</h1>} />
              <Route path="supervisors" element={<h1>supervisors</h1>} />
              <Route path="categories" element={<h1>categories</h1>} />
              <Route path="analytics" element={<h1>analytics</h1>} />
            </Route>
            {/* User Dashboard Routes  */}
            <Route path="/user" element={<UserLayout />}>
              <Route path="" element={<h1>dashboard</h1>} />
              <Route path="users" element={<h1>users</h1>} />
              <Route path="fyps" element={<h1>users</h1>} />
              <Route path="supervisors" element={<h1>users</h1>} />
              <Route path="categories" element={<h1>users</h1>} />
              <Route path="analytics" element={<h1>users</h1>} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
          {!isAdminRoute && !isUserRoute && <Footer />}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
