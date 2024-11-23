import { HiPlus } from "react-icons/hi";
import {
  useGetMyQuestionSets,
  useBringQuestions,
  useBringQuestionSet,
} from "@hooks/useQuestionSet";

export default function QuestionModal({
  isOpen,
  onClose,
  onOverlayClick,
  selectedQuestions,
  fromId,
}) {
  const { data: myQuestionSets } = useGetMyQuestionSets();
  const bringQuestions = useBringQuestions();
  const bringQuestionSet = useBringQuestionSet();

  const handleBringToSet = async (toSetId) => {
    try {
      await bringQuestions.mutateAsync({
        fromId,
        questionIds: selectedQuestions,
        toIds: [toSetId],
      });
      onClose();
    } catch (error) {
      console.error("Failed to bring questions:", error);
    }
  };

  const handleCreateNewSet = async () => {
    try {
      await bringQuestionSet.mutateAsync({
        fromId,
        selectedQuestionIds: selectedQuestions,
      });
      onClose();
    } catch (error) {
      console.error("Failed to create new set:", error);
    }
  };

  return (
    <div
      className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/25"
      onClick={onOverlayClick}
    >
      <div
        className="w-[500px] rounded-lg border border-gray-200 bg-white p-6 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-bold text-xl">질문 가져오기</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <h3 className="mb-3 font-medium text-gray-900">내 면접 세트 목록</h3>
          <div className="space-y-2">
            {myQuestionSets?.map((set) => (
              <button
                key={set.id}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => handleBringToSet(set.id)}
                disabled={set.id === fromId || bringQuestions.isPending}
              >
                {set.title}
                {set.id === fromId && " (현재 세트)"}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-3 font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleCreateNewSet}
            disabled={bringQuestionSet.isPending}
          >
            <HiPlus className="text-gray-500" />
            {bringQuestionSet.isPending ? "생성 중..." : "새 질문세트 추가"}
          </button>
        </div>
      </div>
    </div>
  );
}
