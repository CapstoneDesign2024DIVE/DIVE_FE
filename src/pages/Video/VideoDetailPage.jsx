import { useParams } from "react-router-dom";
import { useGetVideo } from "@hooks/useVideo";
import { formatDate } from "@utils/dateFormat";
import { getCategoryStyle } from "@utils/categoryStyles";

export default function VideoDetailPage() {
  const { id } = useParams();
  const { data: video, isLoading } = useGetVideo(id);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-48px)] items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex h-[calc(100vh-48px)] items-center justify-center">
        <div>영상을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-48px)] max-w-4xl p-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <video
          src={video.videoPath}
          controls
          className="h-full w-full"
          poster={video.thumbnail}
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-xl text-gray-900">{video.question}</h1>
          <span
            className={`rounded-md px-2 py-1 font-medium text-sm ${getCategoryStyle(
              video.category,
            )}`}
          >
            {video.category}
          </span>
        </div>
        <div className="mt-4 border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={video.imageUrl}
                alt={video.nickname}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-medium">{video.nickname}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(video.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="mb-4 font-bold text-lg">댓글</h2>
        <div className="mb-4">
          <div className="flex gap-3">
            <img
              src="/default-profile.png"
              alt="프로필"
              className="h-8 w-8 rounded-full"
            />
            <div className="flex-1">
              <input
                type="text"
                placeholder="댓글 추가..."
                className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {/* 댓글 목록 - 목데이터 */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <img
                src="/default-profile.png"
                alt="프로필"
                className="h-8 w-8 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">면접관{i}</span>
                  <span className="text-sm text-gray-500">2일 전</span>
                </div>
                <p className="mt-1 text-gray-900">
                  Virtual DOM에 대해 잘 설명해주셨습니다. 추가로 Virtual DOM의
                  한계점에 대해서도 공부해보시면 좋을 것 같네요.
                </p>
                <div className="mt-2 flex gap-4 text-sm text-gray-500">
                  <button className="hover:text-gray-900">좋아요</button>
                  <button className="hover:text-gray-900">답글</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
