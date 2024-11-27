import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, updateComment, deleteComment } from "@apis/comment";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ videoId, userId, contents }) =>
      createComment({ videoId, userId, contents }),
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
    mutationFn: ({ commentId, userId, contents, videoId }) =>
      updateComment(commentId, { userId, contents }),
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
    mutationFn: ({ commentId, userId, videoId }) =>
      deleteComment(commentId, userId),
    onSuccess: (_, { videoId, commentId }) => {
      queryClient.setQueryData(["comments", videoId], (oldData) => {
        return oldData?.filter((comment) => comment.id !== commentId);
      });
    },
  });
};
