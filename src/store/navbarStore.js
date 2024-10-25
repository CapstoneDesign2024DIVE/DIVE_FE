import { create } from "zustand";

const useNavbarStore = create((set) => ({
  openMenuItem: null,
  setOpenMenuItem: (index) => set({ openMenuItem: index }),
  resetOpenMenuItem: () => set({ openMenuItem: null }),
}));

export default useNavbarStore;
