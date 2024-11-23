import api from "./axios";

export const createQuestion = async (setId, { contents }) => {
  const response = await api.post(`/question/${setId}/create`, null, {
    params: {
      contents,
    },
  });
  return response.data;
};

export const updateQuestion = async (setId, id, { contents }) => {
  const response = await api.put(`/question/${setId}/${id}/update`, null, {
    params: {
      setId,
      id,
      contents,
    },
  });
  return response.data;
};

export const deleteQuestion = async (setId, ids) => {
  const response = await api.delete(`/question/${setId}/delete`, {
    data: [ids],
  });
  return response.data;
};
