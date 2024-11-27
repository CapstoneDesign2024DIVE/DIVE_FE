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
      login: ({ accessToken, refreshToken, key }) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        set({
          isAuthenticated: true,
          accessToken,
          refreshToken,
          key,
        });
      },
      setUserInfo: (userInfo) => set({ userInfo }),
      logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          key: null,
          userInfo: null,
        });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userInfo: state.userInfo,
        key: state.key,
      }),
    },
  ),
);

export default useAuthStore;
