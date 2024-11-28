import api from "./axios";

export const getAllVideos = async (sortOrder) => {
  const response = await api.get("/video/all", {
    params: { sort: sortOrder },
  });
  return response.data;
};

export const getMyVideos = async () => {
  const response = await api.get("/video/myVideos");
  return response.data.map((video) => ({
    ...video,
    id: video.videoName.split("_")[0], // timestamp를 id로 사용
    isOpen: video.open, // open -> isOpen 변경
    views: 0, // 기본 조회수 추가
  }));
};

export const getVideoById = async (videoId) => {
  const response = await api.get(`/video/${videoId}`);
  return {
    ...response.data,
    id: response.data.videoName.split("_")[0],
    isOpen: response.data.open,
    views: 0,
  };
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

export const completeUpload = async (questionId, videoKey, isOpen) => {
  console.log("Complete upload params:", { questionId, videoKey, isOpen });
  const response = await api.post("/video/complete-upload", {
    questionId,
    videoKey,
    isOpen,
  });
  return response.data;
};

export const updateVideoVisibility = async (videoId, isOpen) => {
  if (!videoId) {
    throw new Error("Video ID is required");
  }

  const response = await api.put(`/video/${videoId}/change/visibility`, {
    isOpen,
  });
  return response.data;
};

export const deleteVideo = async (videoId) => {
  const response = await api.delete(`/video/${videoId}`);
  return response.data;
};
