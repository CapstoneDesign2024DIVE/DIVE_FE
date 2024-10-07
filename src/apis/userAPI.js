import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useUserInfo = () => {
  const { isAuthenticated, token } = useAuthStore();

  return useQuery({
    queryKey: ["user"],
    queryFn: () =>
      api
        .get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data),
    enabled: isAuthenticated,
  });
};

export const login = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (credentials) => api.post("/login", credentials),
    onSuccess: (data) => {
      setAuth(data.token);
      queryClient.setQueryData(["user"], data.user);
    },
  });
};

export const signUp = () => {
  return useMutation({
    mutationFn: (userData) => api.post("/signup", userData),
  });
};

export const logout = () => {
  const queryClient = useQueryClient();
  const logoutStore = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: () =>
      api.post("/logout", null, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      logoutStore();
      queryClient.clear();
    },
  });
};
