import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllVideos,
  getMyVideos,
  getVideoById,
  getPresignedUrl,
  uploadToS3,
  completeUpload,
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
      const { presignedUrl, videoKey } = await getPresignedUrl(
        questionId,
        isOpen,
      );

      const videoFile = new File([videoBlob], videoKey, {
        type: "video/webm",
      });

      await uploadToS3(presignedUrl, videoFile);

      return await completeUpload(questionId, videoKey);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
};
