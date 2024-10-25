import SortButton from "@components/SortButton";
import useSortStore from "@store/store";

export default function VideoPage() {
  const videoSortOrder = useSortStore((state) => state.videoSortOrder);

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-2xl">공개된 면접 영상</h2>
          <SortButton type="video" />
        </div>
      </div>
    </div>
  );
}
