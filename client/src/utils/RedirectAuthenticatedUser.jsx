import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAthenticated, user } = useAuthStore();

  if (isAthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RedirectAuthenticatedUser;
