import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuestionSets,
  getMyQuestionSets,
  createQuestionSet,
  updateQuestionSet,
  deleteQuestionSet,
} from "@apis/questionSet";

export const useGetQuestionSets = (sortOrder) => {
  return useQuery({
    queryKey: ["questionSets", sortOrder],
    queryFn: () => getQuestionSets(sortOrder),
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
    queryFn: getMyQuestionSets,
  });
};

export const useCreateQuestionSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuestionSet,
    onSuccess: (newSet) => {
      queryClient.setQueryData(["myQuestionSets"], (oldData) => {
        const currentData = oldData || [];
        return [
          ...currentData,
          {
            ...newSet,
            questions: [],
          },
        ];
      });
    },
    onError: (error) => {
      console.error("Failed to create question set:", error);
    },
  });
};

export const useUpdateQuestionSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ setId, questionSet }) =>
      updateQuestionSet(setId, questionSet),
    onSuccess: (updatedSet, { setId }) => {
      queryClient.setQueryData(["myQuestionSets"], (oldData) => {
        return oldData?.map((set) => (set.id === setId ? updatedSet : set));
      });
    },
  });
};

export const useDeleteQuestionSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuestionSet,
    onSuccess: (_, deletedSetId) => {
      queryClient.setQueryData(["myQuestionSets"], (oldData) => {
        return oldData?.filter((set) => set.id !== deletedSetId);
      });
    },
  });
};
