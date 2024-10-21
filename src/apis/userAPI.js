import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { refreshToken } = useAuthStore.getState();
        const response = await axios.post("/api/siteUser/refresh", {
          refreshToken,
        });
        const { accessToken } = response.data;
        useAuthStore.getState().login({ accessToken, refreshToken });
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const login = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (credentials) => {
      try {
        const response = await api.post("/siteUser/login", credentials);
        return response.data;
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
      }
    },
    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        key: data.key,
      });
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export const socialLogin = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async ({ code, provider }) => {
      try {
        const response = await api.post(`/login/oauth2/code/${provider}`, {
          code,
        });
        return response.data;
      } catch (error) {
        console.error(
          "Social login error:",
          error.response?.data || error.message,
        );
        throw error;
      }
    },
    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        key: data.key,
      });
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export const signUp = () => {
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (userData) => {
      try {
        const response = await api.post("/siteUser/signup", userData);
        return response.data;
      } catch (error) {
        console.error("Sign up error:", error.response?.data || error.message);
        throw error;
      }
    },
    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        key: data.key,
      });
    },
  });
};

export const logout = () => {
  const queryClient = useQueryClient();
  const logoutStore = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: () => api.post("/siteUser/logout"),
    onSuccess: () => {
      logoutStore();
      queryClient.clear();
    },
  });
};
