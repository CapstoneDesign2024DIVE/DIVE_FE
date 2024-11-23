import axios from "axios";
import useAuthStore from "@store/authStore";

const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         const { refreshToken } = useAuthStore.getState();
//         const response = await axios.post("/api/siteUser/refresh", {
//           refreshToken,
//         });
//         const { accessToken } = response.data;
//         useAuthStore.getState().login({ accessToken, refreshToken });
//         originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         useAuthStore.getState().logout();
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   },
// );

export default api;
