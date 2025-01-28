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
  LoginWithGoogle,
} from "./components/Forms";
import {
  Navbar,
  Footer,
  PageNotFound,
  LoadingSpinner,
} from "./components/shared";
import {
  Home,
  Resources,
  Contact,
  Analysis,
  PublicFYPs,
  Blogs,
  About,
  PrivacyPolicy,
} from "../src/pages/index.js";
import FypDetails from "./pages/fyp/FypDetails";
import { AdminLayout, UserLayout } from "./layouts";
import { useAuthStore } from "@/store/authStore";
import {
  UserManagementPage,
  CategoryPage,
  SupervisorPage,
  AdminFypsListing,
} from "./components/Dashboard/admin";
import { AddFyp, Start, UpdateTemplate } from "./components/Dashboard/shared";
import ProtectedRoute from "./utils/ProtectedRoute";
import RedirectAuthenticatedUser from "./utils/RedirectAuthenticatedUser";
import ListedFyp from "./components/Dashboard/user/listedfyp/ListedFyp";
import { useToast } from "./hooks/use-toast";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";

function App() {
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isUserRoute = location.pathname.startsWith("/user");
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const { toast } = useToast();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.log(error);
        toast({
          title: error.response?.data?.message || "User Authentication Failed",
          description: "",
        });
      }
    };
    checkAuthentication();
  }, []);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <Analytics/> */}
      <Toaster />
      <div className="font-primary">
        {!isAdminRoute && !isUserRoute && <Navbar />}
        <Routes>
          {/* Public Routes  */}
          <Route path="/" element={<Home />} />
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
          <Route path="/login-with-google" element={<LoginWithGoogle />} />
          <Route path="/fyps/:id" element={<FypDetails />} />
          {/* <Route path="/fyps/new" element={<AddFyp/>} />   */}

          {/* Admin Routes  */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route
              path="dashboard"
              element={
                <AdminProtectedRoute>
                  <Start />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="fyps/new"
              element={
                <AdminProtectedRoute>
                  <AddFyp />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="fyps/update/:id"
              element={
                <AdminProtectedRoute>
                  <UpdateTemplate />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <AdminProtectedRoute>
                  <UserManagementPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="fyps"
              element={
                <AdminProtectedRoute>
                  <AdminFypsListing />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="supervisors"
              element={
                <AdminProtectedRoute>
                  <SupervisorPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="categories"
              element={
                <AdminProtectedRoute>
                  <CategoryPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="analytics"
              element={
                <AdminProtectedRoute>
                  <h1>analytics</h1>
                </AdminProtectedRoute>
              }
            />
          </Route>

          {/* User Dashboard Routes  */}
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Start />
                </ProtectedRoute>
              }
            />
            <Route
              path="fyps/new"
              element={
                <ProtectedRoute>
                  <AddFyp />
                </ProtectedRoute>
              }
            />
            <Route
              path="fyps/update/:id"
              element={
                <ProtectedRoute>
                  <UpdateTemplate />
                </ProtectedRoute>
              }
            />
            <Route
              path="listedfyp"
              element={
                <ProtectedRoute>
                  <ListedFyp />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {!isAdminRoute && !isUserRoute && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
