import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      login: (token) => set({ isAuthenticated: true, token }),
      logout: () => set({ isAuthenticated: false, token: null }),
    }),
    {
      name: "auth-storage",
      getStorage: () => sessionStorage,
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useAuthStore;
