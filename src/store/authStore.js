import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      key: null,
      userInfo: null,
      login: ({ accessToken, refreshToken, key }) =>
        set({
          isAuthenticated: true,
          accessToken,
          refreshToken,
          key,
        }),
      setUserInfo: (userInfo) => set({ userInfo }),
      logout: () =>
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          key: null,
          userInfo: null,
        }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    },
  ),
);

export default useAuthStore;
