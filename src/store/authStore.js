import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      key: null,
      userInfo: null,

      login: ({ accessToken, refreshToken, key }) => {
        set({
          isAuthenticated: true,
          accessToken,
          refreshToken,
          key,
        });
      },

      setUserInfo: (userInfo) => set({ userInfo }),

      logout: () => {
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          key: null,
          userInfo: null,
        });
      },

      getAccessToken: () => get().accessToken,
      getRefreshToken: () => get().refreshToken,
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userInfo: state.userInfo,
        key: state.key,
      }),
    },
  ),
);

export default useAuthStore;
