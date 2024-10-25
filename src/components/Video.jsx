import { Link } from "react-router-dom";
import { formatDate } from "@utils/dateFormat";

export default function Video({
  id,
  nickname,
  imgSrc,
  thumbnail,
  title,
  views,
  createdAt,
}) {
  const formattedDate = formatDate(createdAt);

  return (
    <Link
      to={`/videos/${id}`}
      className="group flex w-full flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="flex gap-3 px-1 pt-3">
        <img
          src={imgSrc}
          alt={nickname}
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="line-clamp-2 font-medium text-sm text-gray-900 group-hover:text-blue-600">
            {title}
          </h3>
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
  );
}
