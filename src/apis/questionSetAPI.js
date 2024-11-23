import api from "./axios";

export const getQuestionSets = async (sortOrder) => {
  const response = await api.get("/questionSet/all", {
    params: { sort: sortOrder, open: true },
  });
  return response.data;
};

export const getMyQuestionSets = async () => {
  const response = await api.get("/questionSet/mySets");
  return response.data;
};

export const createQuestionSet = async ({
  title,
  category,
  description,
  open,
}) => {
  const response = await api.post("/questionSet/create", null, {
    params: {
      title,
      category,
      description,
      open,
    },
  });
  return response.data;
};

export const updateQuestionSet = async (setId, questionSet) => {
  const response = await api.put(`/questionSet/${setId}/update`, questionSet);
  return response.data;
};

export const deleteQuestionSet = async (setId) => {
  const response = await api.delete(`/questionSet/${setId}/delete`);
  return response.data;
};
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

export const deleteQuestion = async (setId, id) => {
  const response = await api.delete(`/question/${setId}/delete`, {
    data: { id },
  });
  return response.data;
};
