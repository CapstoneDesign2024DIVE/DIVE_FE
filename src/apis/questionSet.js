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
