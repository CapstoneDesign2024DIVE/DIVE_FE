import { useSearchParams } from "react-router-dom";
import { useGetAllVideos } from "@hooks/useVideo";
import useSortStore from "@store/sortStore";
import { getCategoryStyle } from "@utils/categoryStyles";
import Video from "@components/Video";
import SortButton from "@components/SortButton";

export default function VideoPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const videoSortOrder = useSortStore((state) => state.videoSortOrder);
  const { data: videos = [], isLoading } = useGetAllVideos(videoSortOrder);

  const filteredVideos = videos.filter((video) => {
    if (!category || category === "ALL") return true;
    return video.category === category;
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex h-[50vh] items-center justify-center">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-2xl">공개된 면접 영상</h2>
          {category && category !== "ALL" && (
            <span
              className={`rounded-md px-2 py-1 font-medium text-sm ${getCategoryStyle(
                category,
              )}`}
            >
              {category}
            </span>
          )}
          <SortButton type="video" />
        </div>
      </div>
      {filteredVideos.length === 0 ? (
        <div className="flex h-[50vh] items-center justify-center text-gray-500">
          등록된 영상이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredVideos.map((video) => (
            <Video key={video.videoPath || video.id} {...video} />
          ))}
        </div>
      )}
    </div>
  );
}
