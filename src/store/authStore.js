import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      key: null,
      login: ({ accessToken, refreshToken, key }) =>
        set({ isAuthenticated: true, accessToken, refreshToken, key }),
      logout: () =>
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          key: null,
        }),
    }),
    {
      name: "auth-storage",
      getStorage: () => sessionStorage,
    },
  ),
);

export default useAuthStore;
