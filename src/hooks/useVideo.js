import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllVideos,
  getMyVideos,
  getVideoById,
  getPresignedUrl,
  uploadToS3,
  completeUpload,
  updateVideoVisibility,
  deleteVideo,
} from "@apis/video";

export const useGetAllVideos = (sortOrder) => {
  return useQuery({
    queryKey: ["videos", "all", sortOrder],
    queryFn: () => getAllVideos(sortOrder),
    select: (data) => {
      if (!data) return [];

      console.log("Raw video data from API:", data);

      const videosArray = Array.isArray(data)
        ? data
        : data.videos
          ? data.videos
          : [];

      const processedData = videosArray.map((item) => {
        if (item.video && typeof item.video === "object") {
          return {
            ...item.video,
            ...item,
          };
        }
        return item;
      });

      console.log("Processed video data:", processedData);

      const sortedData = [...processedData].sort((a, b) => {
        switch (sortOrder) {
          case 0:
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 1:
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 2:
            return (
              (b.viewCount || b.views || 0) - (a.viewCount || a.views || 0)
            );
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
    select: (data) => {
      if (!data) return [];

      console.log("My videos raw data:", data);

      const processedData = Array.isArray(data)
        ? data.map((item) => {
            if (item.video && typeof item.video === "object") {
              return {
                ...item.video,
                ...item,
              };
            }
            return item;
          })
        : [];

      return processedData;
    },
  });
};

export const useGetVideo = (videoId) => {
  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => {
      console.log("Fetching video with ID:", videoId);
      if (!videoId) {
        console.error("Attempted to fetch video with undefined ID");
        return Promise.reject(new Error("Video ID is required"));
      }
      return getVideoById(videoId);
    },
    onSuccess: (data) => {
      console.log("Video detail data received:", data);
      if (data && data.video && typeof data.video === "object") {
        console.log("Nested video object structure:", data.video);
      }
    },
    onError: (error) => {
      console.error("Error fetching video:", error);
    },
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
    mutationFn: ({ videoId, isOpen }) => {
      if (!videoId) {
        throw new Error("Video ID is required");
      }
      return updateVideoVisibility(videoId, isOpen);
    },
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
