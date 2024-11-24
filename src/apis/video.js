import api from "./axios";

export const getAllVideos = async (sortOrder) => {
  const response = await api.get("/video/all", {
    params: { sort: sortOrder },
  });
  return response.data;
};
export const getMyVideos = async () => {
  const response = await api.get("/video/myVideos");
  return response.data;
};

export const getVideoById = async (videoId) => {
  const response = await api.get(`/video/${videoId}`);
  return response.data;
};

export const uploadVideo = async ({ questionId, isOpen, videoBlob }) => {
  const formData = new FormData();
  const videoFile = new File([videoBlob], "video.webm", { type: "video/webm" });
  formData.append("newVideo", videoFile);

  const response = await api.post(`/video/upload`, formData, {
    params: {
      questionId,
      isOpen,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
