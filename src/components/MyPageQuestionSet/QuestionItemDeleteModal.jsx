import { useDeleteQuestion } from "@hooks/useQuestionSet";

export default function QuestionItemDeleteModal({
  isOpen,
  onClose,
  onOverlayClick,
  setId,
  questionId,
}) {
  const deleteQuestion = useDeleteQuestion();

  const handleDelete = () => {
    deleteQuestion.mutate({
      setId,
      id: questionId,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-transparent"
      onClick={onOverlayClick}
    >
      <div
        className="w-[400px] rounded-lg border border-gray-200 bg-white p-6 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex justify-center">
          <h2 className="font-bold text-xl">해당 질문을 삭제하시겠습니까?</h2>
        </div>
        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
