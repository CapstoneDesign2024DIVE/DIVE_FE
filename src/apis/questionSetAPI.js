import api from "@utils/axios";

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

export const createQuestionSet = async (questionSet) => {
  const response = await api.post("/questionSet/create", questionSet);
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

export const createQuestion = async (setId, question) => {
  const response = await api.post(`/question/create/${setId}`, question);
  return response.data;
};

export const updateQuestion = async (setId, id, question) => {
  const response = await api.put(`/question/${setId}/${id}/update`, question);
  return response.data;
};

export const deleteQuestion = async (setId, id) => {
  const response = await api.delete(`/question/${setId}/${id}/delete`);
  return response.data;
};
