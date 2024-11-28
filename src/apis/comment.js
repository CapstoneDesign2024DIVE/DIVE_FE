import api from "./axios";

export const getComments = async (videoId) => {
  const response = await api.get(`/comment/${videoId}`);
  return response.data;
};

export const createComment = async ({ videoId, contents }) => {
  const response = await api.post(
    `/comment/${videoId}/create`,
    { contents },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const updateComment = async ({ videoId, commentId, contents }) => {
  const response = await api.put(`/comment/${videoId}/${commentId}/update`, {
    contents,
  });
  return response.data;
};

export const deleteComment = async ({ videoId, commentId }) => {
  const response = await api.delete(`/comment/${videoId}/${commentId}/delete`);
  return response.data;
};
