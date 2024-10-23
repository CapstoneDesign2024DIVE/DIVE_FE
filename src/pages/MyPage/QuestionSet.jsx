import { useGetMyQuestionSets } from "@apis/questionSetAPI";
import { useSearchParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";

export default function MyQuestionSet() {
  const { data: questionSets, isLoading } = useGetMyQuestionSets();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSetId = searchParams.get("setId");

  const getCategoryStyle = (category) => {
    const styles = {
      Frontend: "bg-indigo-100 text-indigo-800",
      Backend: "bg-green-100 text-green-800",
      Android: "bg-red-100 text-red-800",
      iOS: "bg-amber-100 text-amber-800",
      DevOps: "bg-purple-100 text-purple-800",
      CS: "bg-orange-100 text-orange-800",
    };
    return styles[category] || "bg-gray-100 text-gray-800";
  };

  const selectedSet = questionSets?.find(
    (set) => set.id === Number(selectedSetId),
  );

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-96px)] w-full overflow-hidden">
        <div className="w-[500px]">
          <div className="sticky top-0 flex items-center justify-between bg-white p-4">
            <h2 className="font-bold text-2xl">내 면접 세트</h2>
            <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
              <HiPlus size={20} />
            </button>
          </div>
          <div className="h-[calc(100vh-144px)] overflow-y-auto px-4">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full animate-pulse rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="mb-3 h-6 w-1/3 rounded bg-gray-200"></div>
                  <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-48px)] w-full overflow-hidden">
      <div className="w-[calc((100vw-256px)*2/5)] flex-shrink-0">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4">
          <h2 className="font-bold text-2xl">내 면접 세트</h2>
          <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
            <HiPlus size={20} />
          </button>
        </div>
        <div className="h-[calc(100vh-144px)] overflow-y-auto px-4">
          <div className="space-y-2">
            {questionSets?.map((set) => (
              <div
                key={set.id}
                className={`group relative w-full cursor-pointer overflow-visible rounded-lg border border-gray-200 bg-white p-4 transition-all duration-300 ease-in-out ${
                  set.id === Number(selectedSetId) ? "border-indigo-500" : ""
                }`}
                onClick={() => setSearchParams({ setId: set.id.toString() })}
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
                    className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
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
        <div className="flex w-[calc((100vw-256px)*3/5)] flex-1 flex-col overflow-hidden">
          <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4">
            <h2 className="font-bold text-2xl">{selectedSet.title}</h2>
            <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
              <HiPlus size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="px-4">
              <div className="space-y-2">
                {selectedSet.questions.map((question) => (
                  <div
                    key={question.id}
                    className="w-full rounded-lg border border-gray-200 bg-white p-4"
                  >
                    <p className="w-full font-medium text-base text-gray-900">
                      {question.contents}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
