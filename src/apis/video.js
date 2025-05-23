import api from "./axios";

export const getAllVideos = async (sortOrder) => {
  const response = await api.get("/video/all", {
    params: { sort: sortOrder },
  });
  return response.data;
};

export const getMyVideos = async () => {
  const response = await api.get("/video/myVideos");
  console.log(response.data);
  return response.data;
};

export const getVideoById = async (videoId) => {
  const response = await api.get(`/video/${videoId}`);
  return response.data;
};

export const getPresignedUrl = async (questionId) => {
  const response = await api.get("/video/presigned", {
    params: { questionId },
  });
  return response.data;
};

export const uploadToS3 = async (presignedUrl, videoFile) => {
  try {
    await fetch(presignedUrl, {
      method: "PUT",
      body: videoFile,
      headers: {
        "Content-Type": "video/webm",
      },
    });
  } catch (error) {
    console.error("S3 업로드 실패:", error);
    throw error;
  }
};

export const completeUpload = async (questionId, videoKey, isOpen) => {
  console.log("업로드 완료 요청 파라미터:", { questionId, videoKey, isOpen });
  const response = await api.post("/video/complete-upload", {
    questionId,
    videoKey,
    isOpen,
  });
  return response.data;
};

export const updateVideoVisibility = async (videoId, isOpen) => {
  const response = await api.put(`/video/${videoId}/change/visibility`, isOpen);
  return response.data;
};

export const deleteVideo = async (videoId) => {
  const response = await api.delete(`/video/${videoId}/delete`);
  return response.data;
};
