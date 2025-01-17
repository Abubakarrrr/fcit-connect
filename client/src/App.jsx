import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Login,
  SignUp,
  ForgotPassowrd,
  ResetPassword,
  UserProfile,
  EmailVerify,
} from "./components/Forms";
import {
  Navbar,
  Footer,
  PageNotFound,
  LoadingSpinner,
} from "./components/shared";
import { AdminLayout, UserLayout } from "./layouts";
import Home from "@/pages/Home";
import { useAuthStore } from "@/store/authStore";
import FypDetails from "./pages/fyp/FypDetails";
import Fyps from "./components/Dashboard/admin/fyp/Fyps";
import SupervisorPage from "./components/Dashboard/admin/supervisor/Supervisor";
import CategoryPage from "./components/Dashboard/admin/categories/Categories";
import UserManagementPage from "./components/Dashboard/admin/usermanage/UserManagement";
import AddFyp from "./components/Dashboard/shared/AddFyp";
import Start from "./components/Dashboard/admin/Start/Start";
import UpdateTemplate from "./components/Dashboard/shared/update/UpdateTemplate";
import ProtectedRoute from "./utils/ProtectedRoute";
import RedirectAuthenticatedUser from "./utils/RedirectAuthenticatedUser";
import LoginWithGoogle from "./components/Forms/LoginWithGoogle";

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
      <div className="font-primary">
        {!isAdminRoute && !isUserRoute && <Navbar />}
        <Routes>
          {/* Public Routes  */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUp />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <Login />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/verify-email"
            element={
              <RedirectAuthenticatedUser>
                <EmailVerify />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPassowrd />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPassword />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/login-with-google" element={<LoginWithGoogle></LoginWithGoogle>} />
          <Route path="/fyps/:batch/:fypName/:id" element={<FypDetails />} />
          {/* <Route path="/fyps/new" element={<AddFyp/>} />   */}

          {/* Admin Routes  */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Start />} />
            <Route path="fyps/new" element={<AddFyp />} />
            <Route path="fyps/update/:id" element={<UpdateTemplate />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="fyps" element={<Fyps />} />
            <Route path="supervisors" element={<SupervisorPage />} />
            <Route path="categories" element={<CategoryPage />} />
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
    </ThemeProvider>
  );
}

export default App;
