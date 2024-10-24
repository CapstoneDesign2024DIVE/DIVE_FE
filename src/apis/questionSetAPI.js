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
