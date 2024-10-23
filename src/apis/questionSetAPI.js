import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@utils/axios";

export const useGetQuestionSets = (sortOrder) => {
  return useQuery({
    queryKey: ["questionSets", sortOrder],
    queryFn: async () => {
      const response = await api.get("/questionSet/all", {
        params: { sort: sortOrder },
      });
      return response.data;
    },
    select: (data) => {
      const sortedData = [...data].sort((a, b) => {
        switch (sortOrder) {
          case 0: // 최신순
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 1: // 생성순
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 2: // 인기순
            return b.refCount - a.refCount;
          default:
            return 0;
        }
      });
      return sortedData;
    },
  });
};

export const useGetQuestionSet = (id) => {
  return useQuery({
    queryKey: ["questionSet", id],
    queryFn: async () => {
      const response = await api.get(`/questionSet/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useSaveQuestionSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await api.post(`/questionSet/${id}/save`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questionSets"]);
    },
  });
};

export const useStartPractice = () => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await api.post(`/questionSet/${id}/practice`);
      return response.data;
    },
  });
};
