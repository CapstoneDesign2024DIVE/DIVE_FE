import { useQuery } from "@tanstack/react-query";
import { getQuestionSets, getMyQuestionSets } from "@apis/questionSetAPI";
import { mockQuestionSets } from "@mocks/questionSetMock";

export const useGetQuestionSets = (sortOrder) => {
  return useQuery({
    queryKey: ["questionSets", sortOrder],
    queryFn: async () => {
      return mockQuestionSets.filter((set) => set.open);
      // return getQuestionSets(sortOrder);
    },
    select: (data) => {
      const sortedData = [...data].sort((a, b) => {
        switch (sortOrder) {
          case 0:
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 1:
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 2:
            return b.refCount - a.refCount;
          default:
            return 0;
        }
      });
      return sortedData;
    },
  });
};

export const useGetMyQuestionSets = () => {
  return useQuery({
    queryKey: ["myQuestionSets"],
    queryFn: async () => {
      return mockQuestionSets.filter((set) => set.username === "testuser");
      // return getMyQuestionSets();
    },
  });
};
