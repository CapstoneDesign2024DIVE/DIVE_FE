import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as userApi from "@apis/user";
import useAuthStore from "@store/authStore";

export function useUser() {
  const navigate = useNavigate();
  const { login: setAuth, setUserInfo, logout: clearAuth } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const loginResponse = await userApi.login(credentials);

      setAuth({
        accessToken: loginResponse.accessToken,
        refreshToken: loginResponse.refreshToken,
        key: loginResponse.key,
      });

      const userInfoResponse = await userApi.getUserInfo();
      setUserInfo(userInfoResponse);

      return userInfoResponse;
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async (userData) => {
      const signUpResponse = await userApi.signUp(userData);

      setAuth({
        accessToken: signUpResponse.accessToken,
        refreshToken: signUpResponse.refreshToken,
        key: signUpResponse.key,
      });

      const userInfoResponse = await userApi.getUserInfo();
      setUserInfo(userInfoResponse);

      return userInfoResponse;
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
    },
  });

  const getOAuthUrl = (provider) => {
    const config = {
      naver: {
        clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
        redirectUri: `${import.meta.env.VITE_FRONTEND_URL}/auth/naver/callback`,
        baseUrl: "https://nid.naver.com/oauth2.0/authorize",
      },
      kakao: {
        clientId: import.meta.env.VITE_KAKAO_CLIENT_ID,
        redirectUri: `${import.meta.env.VITE_FRONTEND_URL}/auth/kakao/callback`,
        baseUrl: "https://kauth.kakao.com/oauth/authorize",
      },
    };

    const { clientId, redirectUri, baseUrl } = config[provider];

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      state: crypto.randomUUID(),
    });

    return `${baseUrl}?${params.toString()}`;
  };

  const socialLogin = (provider) => {
    const url = getOAuthUrl(provider);
    window.location.href = url;
  };

  const handleCallback = async (provider, code, state) => {
    try {
      const response = await userApi.handleCallback(provider, code, state);

      setAuth({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        key: response.key,
      });

      const userInfo = await userApi.getUserInfo();
      setUserInfo(userInfo);

      navigate("/");
    } catch (error) {
      console.error("Social login callback failed:", error);
      navigate("/login");
    }
  };

  const logoutUser = async () => {
    try {
      await userApi.logout();
      clearAuth();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const refreshUserToken = async () => {
    try {
      const data = await userApi.refreshToken();
      const { accessToken, refreshToken, key } = data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setAuth({
        accessToken,
        refreshToken,
        key,
      });
      return data;
    } catch (error) {
      console.error("Token refresh failed:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      clearAuth();
      navigate("/login");
    }
  };

  return {
    login: loginMutation,
    signUp: signUpMutation,
    socialLogin,
    handleCallback,
    logout: logoutUser,
    refreshToken: refreshUserToken,
    isLoading: loginMutation.isLoading || signUpMutation.isLoading,
  };
}
