import api from "@utils/axios";

export const getUserInfo = async () => {
  const response = await api.get("/siteUser/me");
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/siteUser/login", credentials);
  return response.data;
};

export const socialLogin = async ({ code, provider }) => {
  const response = await api.post(`/login/oauth2/code/${provider}`, { code });
  return response.data;
};

export const signUp = async (userData) => {
  const response = await api.post("/siteUser/signup", userData);
  return response.data;
};
