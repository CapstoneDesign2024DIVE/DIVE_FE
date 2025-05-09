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
  const data = {
    code,
    ...(provider === "naver" && { state }),
  };

  const response = await api.post(`/auth/${provider}/callback`, data);
  return response.data;
};
