import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import { getCurrentUser } from "../apis/userAPI";

export const useAuth = () => {
  const { isAuthenticated, login, logout } = useAuthStore();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: isAuthenticated,
    onError: () => logout(),
  });

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };
};
