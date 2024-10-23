import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@utils/axios";
import useAuthStore from "@store/authStore";

const getMockUserInfo = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    nickname: "testuser",
    email: "test@test.com",
  };
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMockUserInfo,
    // async () => {
    //   const response = await api.get("/siteUser/me");
    //   return response.data;
    // },
  });
};

export const login = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("/siteUser/login", credentials);
      return response.data;
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
      const response = await api.post(`/login/oauth2/code/${provider}`, {
        code,
      });
      return response.data;
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
      const response = await api.post("/siteUser/signup", userData);
      return response.data;
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
