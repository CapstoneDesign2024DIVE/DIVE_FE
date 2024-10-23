import { BsThreeDotsVertical } from "react-icons/bs";

export default function QuestionSetCard({
  set,
  isSelected,
  onClick,
  getCategoryStyle,
}) {
  return (
    <div
      className={`group relative w-full cursor-pointer overflow-visible rounded-lg border bg-white p-4 transition-all duration-300 ease-in-out ${
        isSelected
          ? "border-indigo-500"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={onClick}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-3">
          <span
            className={`rounded-md px-3 py-1 font-medium text-sm ${getCategoryStyle(
              set.category,
            )}`}
          >
            {set.category}
          </span>
          <span
            className={`rounded-md px-3 py-1 font-medium text-sm ${
              set.open
                ? "bg-gray-700 text-gray-50"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {set.open ? "공개" : "비공개"}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
        >
          <BsThreeDotsVertical size={16} />
        </button>
      </div>
      <h3 className="mb-2 font-bold text-lg text-gray-900 transition-colors duration-300 ease-in-out">
        {set.title}
      </h3>
      <p className="line-clamp-2 font-medium text-sm text-gray-600 transition-colors duration-300 ease-in-out">
        {set.description}
      </p>
    </div>
  );
}
