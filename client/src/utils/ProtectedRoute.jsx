import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAthenticated, user } = useAuthStore();

  if (!isAthenticated || user?.role !== "user") {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

export default ProtectedRoute;
