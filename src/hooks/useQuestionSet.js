import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuestionSets,
  getMyQuestionSets,
  createQuestionSet,
  updateQuestionSet,
  deleteQuestionSet,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "@apis/questionSetAPI";
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
      // getMyQuestionSets();
    },
  });
};

export const useCreateQuestionSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questionSet) => {
      alert("질문세트 생성 요청이 전송되었습니다.");
      return { success: true };
      //createQuestionSet(questionSet);
    },
    // onSuccess: (newQuestionSet) => {
    //   queryClient.setQueryData(["myQuestionSets"], (oldData) => {
    //     return oldData ? [...oldData, newQuestionSet] : [newQuestionSet];
    //   });

    //   if (newQuestionSet.open) {
    //     queryClient.setQueryData(["questionSets"], (oldData) => {
    //       return oldData ? [...oldData, newQuestionSet] : [newQuestionSet];
    //     });
    //   }
    // },
  });
};

export const useUpdateQuestionSet = () => {
  return useMutation({
    mutationFn: async ({ setId, questionSet }) => {
      alert("질문세트 수정 요청이 전송되었습니다.");
      return { success: true };
      // updateQuestionSet(setId, questionSet);
    },
    // onSuccess: (updatedSet, { setId }) => {
    //   queryClient.setQueryData(["myQuestionSets"], (oldData) => {
    //     return oldData?.map((set) => (set.id === setId ? updatedSet : set));
    //   });

    //   queryClient.setQueryData(["questionSets"], (oldData) => {
    //     return oldData?.map((set) => (set.id === setId ? updatedSet : set));
    //   });
    // },
  });
};

export const useDeleteQuestionSet = () => {
  return useMutation({
    mutationFn: async (setId) => {
      alert("질문세트 삭제 요청이 전송되었습니다.");
      return { success: true };
      // deleteQuestionSet(setId);
    },
    onSuccess: (_, deletedSetId) => {
      queryClient.setQueryData(["myQuestionSets"], (oldData) => {
        return oldData?.filter((set) => set.id !== deletedSetId);
      });

      queryClient.setQueryData(["questionSets"], (oldData) => {
        return oldData?.filter((set) => set.id !== deletedSetId);
      });
    },
  });
};

export const useCreateQuestion = () => {
  return useMutation({
    mutationFn: async ({ setId, question }) => {
      alert("질문 생성 요청이 전송되었습니다.");
      return { success: true };
      // createQuestion(setId, question);
    },
    // onSuccess: (newQuestion, { setId }) => {
    //   ["myQuestionSets", "questionSets"].forEach((key) => {
    //     queryClient.setQueryData([key], (oldData) => {
    //       return oldData?.map((set) => {
    //         if (set.id === setId) {
    //           return {
    //             ...set,
    //             questions: [...set.questions, newQuestion],
    //           };
    //         }
    //         return set;
    //       });
    //     });
    //   });
    // },
  });
};

export const useUpdateQuestion = () => {
  return useMutation({
    mutationFn: async ({ setId, id, question }) => {
      alert("질문 수정 요청이 전송되었습니다.");
      return { success: true };
      // updateQuestion(setId, id, question);
    },
    // onSuccess: (updatedQuestion, { setId, id }) => {
    //   ["myQuestionSets", "questionSets"].forEach((key) => {
    //     queryClient.setQueryData([key], (oldData) => {
    //       return oldData?.map((set) => {
    //         if (set.id === setId) {
    //           return {
    //             ...set,
    //             questions: set.questions.map((q) =>
    //               q.id === id ? updatedQuestion : q,
    //             ),
    //           };
    //         }
    //         return set;
    //       });
    //     });
    //   });
    // },
  });
};

export const useDeleteQuestion = () => {
  return useMutation({
    mutationFn: async ({ setId, id }) => {
      alert("질문 삭제 요청이 전송되었습니다.");
      return { success: true };
      // deleteQuestion(setId, id);
    },
    // onSuccess: (_, { setId, id }) => {
    //   ["myQuestionSets", "questionSets"].forEach((key) => {
    //     queryClient.setQueryData([key], (oldData) => {
    //       return oldData?.map((set) => {
    //         if (set.id === setId) {
    //           return {
    //             ...set,
    //             questions: set.questions.filter((q) => q.id !== id),
    //           };
    //         }
    //         return set;
    //       });
    //     });
    //   });
    // },
  });
};
