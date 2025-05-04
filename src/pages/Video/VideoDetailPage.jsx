import { useParams } from "react-router-dom";
import { useGetVideo } from "@hooks/useVideo";
import { formatDate } from "@utils/dateFormat";
import { getCategoryStyle } from "@utils/categoryStyles";
import useAuthStore from "@store/authStore";
import VideoComments from "./VideoComments";
import VideoFeedback from "./VideoFeedback";

export default function VideoDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetVideo(id);
  const { userInfo } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-48px)] items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!data || !data.video) {
    return (
      <div className="flex h-[calc(100vh-48px)] items-center justify-center">
        <div>영상을 찾을 수 없습니다.</div>
      </div>
    );
  }

  const { video, feedback } = data;

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

      <VideoFeedback feedback={feedback} />

      <VideoComments
        videoId={video.videoId}
        currentUser={{
          id: userInfo?.id,
          imageUrl: userInfo?.imageUrl,
          nickname: userInfo?.nickname,
        }}
      />
    </div>
  );
}
