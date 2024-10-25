import { useQuery } from "@tanstack/react-query";
import { mockVideos } from "@mocks/videoMock";

export const useGetVideos = (sortOrder) => {
  return useQuery({
    queryKey: ["videos", sortOrder],
    queryFn: async () => {
      return mockVideos.filter((video) => video.open);
    },
    select: (data) => {
      const sortedData = [...data].sort((a, b) => {
        switch (sortOrder) {
          case 0: // 최신순
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 1: // 생성순
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 2: // 인기순 (조회수 기준)
            return b.views - a.views;
          default:
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
      return sortedData;
    },
  });
};

export const useGetVideo = (videoId) => {
  return useQuery({
    queryKey: ["video", videoId],
    queryFn: async () => {
      const video = mockVideos.find(
        (v) => v.id === Number(videoId) && v.open === true,
      );
      if (!video) {
        throw new Error("Video not found");
      }
      return video;
    },
    enabled: !!videoId,
  });
};
