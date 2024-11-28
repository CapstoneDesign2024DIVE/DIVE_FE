import { useGetMyVideos } from "@hooks/useVideo";
import Video from "@components/Video";

export default function MyVideo() {
  const { data: videos, isLoading } = useGetMyVideos();

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
        <div>
          <h2 className="font-bold text-2xl">내 면접 영상</h2>
        </div>
      </div>
      {!videos || videos.length === 0 ? (
        <div className="flex h-[50vh] items-center justify-center text-gray-500">
          등록된 영상이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <Video key={video.id} {...video} isMyVideo={true} />
          ))}
        </div>
      )}
    </div>
  );
}
