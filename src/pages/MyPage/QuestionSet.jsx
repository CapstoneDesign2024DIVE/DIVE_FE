import { useGetMyQuestionSets } from "@apis/questionSetAPI";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { getCategoryStyle } from "@utils/categoryStyles";

export default function MyQuestionSet() {
  const { data: questionSets } = useGetMyQuestionSets();
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const selectedSet = questionSets?.find((set) => set.id === selectedSetId);

  return (
    <div className="flex h-[calc(100vh-48px)] w-full overflow-hidden">
      <div className="w-[calc((100vw-256px)*0.4)] flex-shrink-0">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4">
          <h2 className="font-bold text-2xl">내 면접 세트</h2>
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
            <HiPlus size={20} />
          </button>
        </div>
        <div className="h-[calc(100vh-144px)] overflow-y-auto px-4">
          <div className="space-y-2">
            {questionSets?.map((set) => (
              <div
                key={set.id}
                className={`group relative w-full cursor-pointer overflow-visible rounded-lg border bg-white p-4 transition-all duration-300 ease-in-out ${
                  set.id === selectedSetId
                    ? "border-indigo-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => {
                  setSelectedSetId(set.id === selectedSetId ? null : set.id);
                  setSelectedQuestionId(null);
                }}
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
            ))}
          </div>
        </div>
      </div>
      {selectedSet ? (
        <div className="flex w-[calc((100vw-256px)*0.6)] flex-1 flex-col overflow-hidden">
          <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4">
            <h2 className="font-bold text-2xl">{selectedSet.title}</h2>
            <div className="flex gap-1">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <BsThreeDotsVertical size={16} />
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <HiPlus size={20} />
              </button>
            </div>
          </div>
          <div className="h-[calc(100vh-144px)] overflow-y-auto px-4">
            <div className="space-y-2">
              {selectedSet.questions.map((question) => {
                const isSelected = selectedQuestionId === question.id;
                return (
                  <div
                    key={question.id}
                    className={`group relative w-full cursor-pointer overflow-hidden rounded-lg border bg-white transition-all duration-200 ${
                      isSelected
                        ? "border-indigo-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      setSelectedQuestionId(isSelected ? null : question.id)
                    }
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
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
