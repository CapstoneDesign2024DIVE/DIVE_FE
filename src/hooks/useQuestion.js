import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestion, updateQuestion, deleteQuestion } from "@apis/question";

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ setId, contents }) => createQuestion(setId, { contents }),
    onSuccess: (newQuestion, { setId }) => {
      queryClient.setQueryData(["myQuestionSets"], (oldData) => {
        return oldData?.map((set) => {
          if (set.id === setId) {
            return {
              ...set,
              questions: [...(set.questions || []), newQuestion],
            };
          }
          return set;
        });
      });
    },
  });
};

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ setId, id, contents }) =>
      updateQuestion(setId, id, { contents }),
    onSuccess: (updatedQuestion, { setId, id }) => {
      queryClient.setQueryData(["myQuestionSets"], (oldData) => {
        return oldData?.map((set) => {
          if (set.id === setId) {
            return {
              ...set,
              questions: set.questions.map((q) =>
                q.id === id ? updatedQuestion : q,
              ),
            };
          }
          return set;
        });
      });
    },
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ setId, id }) => deleteQuestion(setId, id),
    onSuccess: (_, { setId, id }) => {
      queryClient.setQueryData(["myQuestionSets"], (oldData) => {
        return oldData?.map((set) => {
          if (set.id === setId) {
            return {
              ...set,
              questions: set.questions.filter((q) => q.id !== id),
            };
          }
          return set;
        });
      });
    },
  });
};
