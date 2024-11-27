import api from "./axios";

export const getComments = async (videoId, userId) => {
  const response = await api.get(`/comment/${videoId}`, {
    params: {
      userId,
    },
  });
  return response.data;
};

export const createComment = async ({ videoId, userId, contents }) => {
  const response = await api.post("/comment/create", null, {
    params: {
      videoId,
      userId,
      contents,
    },
  });
  return response.data;
};

export const updateComment = async (commentId, { userId, contents }) => {
  const response = await api.put(`/comment/${commentId}/update`, {
    userId,
    contents,
  });
  return response.data;
};

export const deleteComment = async (commentId, userId) => {
  const response = await api.delete(`/comment/${commentId}/delete`, {
    params: {
      userId,
    },
  });
  return response.data;
};
