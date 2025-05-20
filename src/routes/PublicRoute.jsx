import { Navigate } from "react-router-dom";
import useAuthStore from "@store/authStore";

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/videos" replace /> : children;
}
