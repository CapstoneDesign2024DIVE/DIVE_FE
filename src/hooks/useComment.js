import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, updateComment, deleteComment } from "@apis/comment";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ videoId, contents }) => createComment({ videoId, contents }),
    onError: (error) => {
      console.error("Failed to create comment:", error.message);
    },
    onSuccess: (newComment, { videoId }) => {
      queryClient.setQueryData(["comments", videoId], (oldData) => {
        return [...(oldData || []), newComment];
      });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ videoId, commentId, contents }) =>
      updateComment({ videoId, commentId, contents }),
    onSuccess: (updatedComment, { videoId, commentId }) => {
      queryClient.setQueryData(["comments", videoId], (oldData) => {
        return oldData?.map((comment) =>
          comment.id === commentId ? updatedComment : comment,
        );
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ videoId, commentId }) =>
      deleteComment({ videoId, commentId }),
    onSuccess: (_, { videoId, commentId }) => {
      queryClient.setQueryData(["comments", videoId], (oldData) => {
        return oldData?.filter((comment) => comment.id !== commentId);
      });
    },
  });
};
