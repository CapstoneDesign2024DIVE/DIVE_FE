import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSortStore = create(
  persist(
    (set) => ({
      sortOrder: 0, // 0: 최신순, 1: 생성순, 2: 인기순
      setSortOrder: (order) => set({ sortOrder: order }),
    }),
    {
      name: "sort-storage",
      getStorage: () => localStorage,
    },
  ),
);

export default useSortStore;
