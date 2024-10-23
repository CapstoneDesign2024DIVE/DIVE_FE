import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function QuestionItem({ question, isSelected, onClick }) {
  return (
    <div
      className={`group relative w-full cursor-pointer overflow-hidden rounded-lg border bg-white transition-all duration-200 ${
        isSelected
          ? "border-indigo-500"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={onClick}
    >
      <div className="relative flex w-full items-center">
        <div className="w-full p-3">
          <p className="font-medium text-base text-gray-900">
            {question.contents}
          </p>
        </div>
        <div
          className={`absolute right-0 top-0 flex h-full w-24 transform items-center justify-center overflow-hidden transition-all duration-200 ${
            isSelected ? "w-24" : "w-0"
          }`}
        >
          <div
            className={`flex h-full items-center justify-end transition-opacity duration-200 ${
              isSelected ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              className="flex h-12 w-12 items-center justify-center bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                // 수정 동작
              }}
            >
              <FiEdit2 size={18} />
            </button>
            <button
              className="flex h-12 w-12 items-center justify-center bg-red-200 text-red-600 transition-colors hover:bg-red-300"
              onClick={(e) => {
                e.stopPropagation();
                // 삭제 동작
              }}
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
