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
    console.error("S3 upload failed:", error);
    throw error;
  }
};

export const completeUpload = async (questionId, videoUrl, isOpen) => {
  const response = await api.post("/video/complete-upload", {
    questionId,
    videoUrl,
    isOpen,
  });
  return response.data;
};
