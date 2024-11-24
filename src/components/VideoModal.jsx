// import { useUpdateVideo, useDeleteVideo } from "@hooks/useVideo";
import { useState } from "react";

export default function VideoModal({ isOpen, onClose, onOverlayClick, video }) {
  // const updateVideo = useUpdateVideo();
  // const deleteVideo = useDeleteVideo();
  const [isPublic, setIsPublic] = useState(video?.open);

  const handleEdit = () => {
    // updateVideo.mutate({
    //   videoId: video.id,
    //   changes: {
    //     ...video,
    //     open: isPublic,
    //   },
    // });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 영상을 삭제하시겠습니까?")) {
      // deleteVideo.mutate(video.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-transparent"
      onClick={onOverlayClick}
    >
      <div
        className="flex w-[400px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-bold text-xl">영상 설정</h2>
        </div>
        <div className="flex-1">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full"></div>
            <span className="ml-3 font-medium">공개</span>
          </label>
        </div>
        <div className="mt-6 flex justify-end border-t border-gray-200 pt-4">
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={handleEdit}
              className="rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-600"
            >
              적용
            </button>
            <button
              onClick={handleDelete}
              className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
