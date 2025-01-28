import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { isAthenticated, user } = useAuthStore();

  if (!isAthenticated || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

export default AdminProtectedRoute;
