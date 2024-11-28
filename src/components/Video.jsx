import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "@utils/dateFormat";
import { BsThreeDotsVertical } from "react-icons/bs";
import VideoModal from "@components/VideoModal";

export default function Video({
  id,
  nickname,
  imageUrl,
  thumbnail,
  question,
  views = 0,
  createdAt,
  isMyVideo = false,
  ...videoData
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [profileError, setProfileError] = useState(false);
  const formattedDate = formatDate(createdAt);

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const getFormattedUrl = (url, defaultUrl) => {
    if (!url) return defaultUrl;
    if (url.startsWith("http")) return url;
    return `https://du9fwrg5k8ff9.cloudfront.net/${url.replace(/^\//, "")}`;
  };

  return (
    <>
      <Link
        to={`/videos/${id}`}
        className="group flex w-full flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <img
            src={
              thumbnailError
                ? "/default-thumbnail.png"
                : getFormattedUrl(thumbnail, "/default-thumbnail.png")
            }
            alt={question}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            onError={() => setThumbnailError(true)}
          />
        </div>
        <div className="flex gap-3 px-1 pt-3">
          <img
            src={
              profileError
                ? "/default-profile.png"
                : getFormattedUrl(imageUrl, "/default-profile.png")
            }
            alt={nickname}
            className="h-9 w-9 rounded-full object-cover"
            onError={() => setProfileError(true)}
          />
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between gap-1">
              <h3 className="line-clamp-2 flex-1 font-medium text-sm text-gray-900 group-hover:text-blue-600">
                {question}
              </h3>
              {isMyVideo && (
                <button
                  onClick={handleMenuClick}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                >
                  <BsThreeDotsVertical size={16} />
                </button>
              )}
            </div>
            <p className="mt-1 font-medium text-[13px] text-gray-600">
              {nickname}
            </p>
            <div className="flex items-center text-[13px] text-gray-600">
              <span>조회수 {views.toLocaleString()}회</span>
              <span className="mx-1 text-[3px]">●</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </Link>
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOverlayClick={() => setIsModalOpen(false)}
        video={{
          id,
          nickname,
          imgSrc: imageUrl,
          thumbnail,
          title: question,
          views,
          createdAt,
          ...videoData,
        }}
      />
    </>
  );
}
