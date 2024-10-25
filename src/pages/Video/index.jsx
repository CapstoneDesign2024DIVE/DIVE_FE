import Video from "@components/Video";
import SortButton from "@components/SortButton";
import { useGetVideos } from "@hooks/useVideo";
import useSortStore from "@store/sortStore";
import { useSearchParams } from "react-router-dom";
import { getCategoryStyle } from "@utils/categoryStyles";

export default function VideoPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const videoSortOrder = useSortStore((state) => state.videoSortOrder);
  const { data: videos = [] } = useGetVideos(videoSortOrder);

  const filteredVideos = videos.filter((video) => {
    if (!category || category === "ALL") return true;
    return video.category === category;
  });

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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredVideos.map((video) => (
          <Video key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
}
