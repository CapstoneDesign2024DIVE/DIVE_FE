import { useMutation } from "@tanstack/react-query";
import { getUserInfo, login, signUp } from "@apis/userAPI";
import useAuthStore from "@store/authStore";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.login);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  return useMutation({
    mutationFn: async (credentials) => {
      const loginResponse = await login(credentials);

      setAuth({
        accessToken: loginResponse.accessToken,
        refreshToken: loginResponse.refreshToken,
        key: loginResponse.key,
      });

      setUserInfo({
        username: "test",
        email: "test@test.com",
        nickname: "test",
        profileImage:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      });
    },
  });
};

export const useSignUp = () => {
  const setAuth = useAuthStore((state) => state.login);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  return useMutation({
    mutationFn: async (userData) => {
      const signUpResponse = await signUp(userData);

      setAuth({
        accessToken: signUpResponse.accessToken,
        refreshToken: signUpResponse.refreshToken,
        key: signUpResponse.key,
      });

      const userInfoResponse = await getUserInfo();

      setUserInfo(userInfoResponse);

      return userInfoResponse;
    },
  });
};
