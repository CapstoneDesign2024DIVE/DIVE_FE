import { FaLayerGroup } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function QuestionSet({
  id,
  imageUrl,
  nickname,
  refCount,
  title,
  description,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/questionSet/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-[360px] cursor-pointer overflow-hidden rounded-lg border border-gray-200 p-4 shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={imageUrl}
            alt={`${nickname}의 프로필`}
            className="h-7 w-7 rounded-full ring-1 ring-gray-100 transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:ring-indigo-200"
          />
          <div className="font-medium text-sm transition-colors duration-300 ease-in-out group-hover:text-gray-900">
            {nickname}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaLayerGroup className="text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-indigo-500" />
          <span className="font-medium text-sm transition-colors duration-300 ease-in-out group-hover:text-gray-900">
            {refCount}
          </span>
        </div>
      </div>
      <h2 className="mb-2 truncate font-bold text-lg transition-colors duration-300 ease-in-out group-hover:text-indigo-600">
        {title}
      </h2>
      <p className="line-clamp-2 font-medium text-sm text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-gray-700">
        {description}
      </p>
    </div>
  );
}
