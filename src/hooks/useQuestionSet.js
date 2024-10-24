import { useQuery, useMutation } from "@tanstack/react-query";
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

export const useCreateQuestionSet = () => {
  return useMutation({
    mutationFn: async (questionSet) => {
      alert("질문세트 생성 요청이 전송되었습니다.");
      return { success: true };
    },
  });
};

export const useUpdateQuestionSet = () => {
  return useMutation({
    mutationFn: async ({ setId, questionSet }) => {
      alert("질문세트 수정 요청이 전송되었습니다.");
      return { success: true };
    },
  });
};

export const useDeleteQuestionSet = () => {
  return useMutation({
    mutationFn: async (setId) => {
      alert("질문세트 삭제 요청이 전송되었습니다.");
      return { success: true };
    },
  });
};

// 질문 관련 mutation hooks
export const useCreateQuestion = () => {
  return useMutation({
    mutationFn: async ({ setId, question }) => {
      alert("질문 생성 요청이 전송되었습니다.");
      return { success: true };
    },
  });
};

export const useUpdateQuestion = () => {
  return useMutation({
    mutationFn: async ({ setId, id, question }) => {
      alert("질문 수정 요청이 전송되었습니다.");
      return { success: true };
    },
  });
};

export const useDeleteQuestion = () => {
  return useMutation({
    mutationFn: async ({ setId, id }) => {
      alert("질문 삭제 요청이 전송되었습니다.");
      return { success: true };
    },
  });
};
