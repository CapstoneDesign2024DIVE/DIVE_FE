import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserInfo, login, socialLogin, signUp } from "@apis/userAPI";
import useAuthStore from "@store/authStore";
import { mockUserInfo } from "@mocks/userMock";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (import.meta.env.DEV) {
        return mockUserInfo;
      }
      // return getUserInfo();
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: login,
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

export const useSocialLogin = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: socialLogin,
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

export const useSignUp = () => {
  const setAuth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        key: data.key,
      });
    },
  });
};
