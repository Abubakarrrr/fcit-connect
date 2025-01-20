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
  LoginWithGoogle
} from "./components/Forms";
import {
  Navbar,
  Footer,
  PageNotFound,
  LoadingSpinner,
} from "./components/shared";
import {Home, Resources,Contact,Analysis,PublicFYPs,Blogs,About,PrivacyPolicy} from "../src/pages/index.js"
import FypDetails from "./pages/fyp/FypDetails";
import { AdminLayout, UserLayout } from "./layouts";
import { useAuthStore } from "@/store/authStore";
import { UserManagementPage,CategoryPage,SupervisorPage,AdminFypsListing } from "./components/Dashboard/admin";
import { AddFyp,Start,UpdateTemplate } from "./components/Dashboard/shared";
import ProtectedRoute from "./utils/ProtectedRoute";
import RedirectAuthenticatedUser from "./utils/RedirectAuthenticatedUser";
import ListedFyp from "./components/Dashboard/user/listedfyp/ListedFyp";

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
              // <ProtectedRoute>
              <Home />
              //  </ProtectedRoute> 
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
          <Route path="/fyps" element={<PublicFYPs />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/login-with-google"
            element={<LoginWithGoogle/>}
          />
          <Route path="/fyps/:batch/:fypName/:id" element={<FypDetails />} />
          {/* <Route path="/fyps/new" element={<AddFyp/>} />   */}

          {/* Admin Routes  */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Start />} />
            <Route path="fyps/new" element={<AddFyp />} />
            <Route path="fyps/update/:id" element={<UpdateTemplate />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="fyps" element={<AdminFypsListing />} />
            <Route path="supervisors" element={<SupervisorPage />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="analytics" element={<h1>analytics</h1>} />
          </Route>
          {/* User Dashboard Routes  */}
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<Start/>} />
            <Route path="fyps/new" element={<AddFyp />} />
            <Route path="fyps/update/:id" element={<UpdateTemplate />} />
            <Route path="listedfyp" element={<ListedFyp />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {!isAdminRoute && !isUserRoute  && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
