import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSortStore = create(
  persist(
    (set) => ({
      questionSetSortOrder: 0, // 0: 최신순, 1: 생성순, 2: 인기순
      videoSortOrder: 0,
      setQuestionSetSortOrder: (order) => set({ questionSetSortOrder: order }),
      setVideoSortOrder: (order) => set({ videoSortOrder: order }),
    }),
    {
      name: "sort-storage",
      getStorage: () => localStorage,
    },
  ),
);

export default useSortStore;
