import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllVideos,
  getMyVideos,
  getVideoById,
  getPresignedUrl,
  uploadToS3,
  completeUpload,
  updateVideo,
  deleteVideo,
} from "@apis/video";

export const useGetAllVideos = (sortOrder) => {
  return useQuery({
    queryKey: ["videos", "all"],
    queryFn: () => getAllVideos(),
    select: (data) => {
      if (!data) return [];
      const sortedData = [...data].sort((a, b) => {
        switch (sortOrder) {
          case 0:
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 1:
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 2:
            return b.viewCount - a.viewCount;
          default:
            return 0;
        }
      });
      return sortedData;
    },
  });
};

export const useGetMyVideos = () => {
  return useQuery({
    queryKey: ["videos", "my"],
    queryFn: getMyVideos,
  });
};

export const useGetVideo = (videoId) => {
  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideoById(videoId),
    enabled: !!videoId,
  });
};

export const useUploadVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId, isOpen, videoBlob }) => {
      try {
        console.log("Starting upload with questionId:", questionId);

        const presignedUrlResponse = await getPresignedUrl(questionId);
        console.log("Presigned URL Response:", presignedUrlResponse);

        const { presignedUrl, videoKey } = presignedUrlResponse;

        const videoFile = new File([videoBlob], videoKey, {
          type: "video/webm",
        });

        await uploadToS3(presignedUrl, videoFile);
        return await completeUpload(questionId, videoKey, isOpen);
      } catch (error) {
        console.error("Upload error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
};

export const useUpdateVideoVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ videoId, isOpen }) => updateVideoVisibility(videoId, isOpen),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      queryClient.invalidateQueries({ queryKey: ["video"] });
    },
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
};
