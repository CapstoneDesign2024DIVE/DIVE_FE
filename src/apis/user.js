import api from "./axios";

export const getUserInfo = async () => {
  const response = await api.get("/siteUser/myInfo");
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/siteUser/login", credentials);
  return response.data;
};

export const signUp = async (userData) => {
  const response = await api.post("/siteUser/signup", userData);
  return response.data;
};

export const logout = async () => {
  const response = await api.get("/auth/logout");
  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post("/auth/refresh");
  return response.data;
};

export const handleCallback = async (provider, code, state) => {
  let params;
  if (provider === "naver") {
    params = { code, state };
  } else if (provider === "kakao") {
    params = { code };
  }

  const response = await api.post(`/auth/${provider}/callback`, params);
  return response.data;
};
