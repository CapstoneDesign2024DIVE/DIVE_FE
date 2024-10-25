import { useQuery } from "@tanstack/react-query";
import { mockVideos } from "@mocks/videoMock";

export const useGetVideos = (sortOrder) => {
  const getVideos = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const sortedVideos = [...mockVideos].sort((a, b) => {
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

    return sortedVideos;
  };

  return useQuery({
    queryKey: ["videos", sortOrder],
    queryFn: getVideos,
  });
};

export const useGetVideo = (videoId) => {
  const getVideo = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const video = mockVideos.find((v) => v.id === Number(videoId));
    if (!video) {
      throw new Error("Video not found");
    }

    return video;
  };

  return useQuery({
    queryKey: ["video", videoId],
    queryFn: getVideo,
    enabled: !!videoId,
  });
};
