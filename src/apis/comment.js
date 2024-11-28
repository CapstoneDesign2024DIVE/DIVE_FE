import api from "./axios";

export const getComments = async (videoId) => {
  const response = await api.get(`/comment/${videoId}`);
  console.log(response.data);
  return response.data;
};

export const createComment = async ({ videoId, contents }) => {
  if (!contents || contents.trim() === "") {
    throw new Error("Comment cannot be empty");
  }

  const response = await api.post(
    `/comment/${videoId}/create`,
    contents.trim(),
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
  return response.data;
};

export const updateComment = async ({ videoId, commentId, contents }) => {
  const response = await api.put(
    `/comment/${videoId}/${commentId}/update`,
    contents,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
  return response.data;
};

export const deleteComment = async ({ videoId, commentId }) => {
  const response = await api.delete(`/comment/${videoId}/${commentId}/delete`);
  return response.data;
};
