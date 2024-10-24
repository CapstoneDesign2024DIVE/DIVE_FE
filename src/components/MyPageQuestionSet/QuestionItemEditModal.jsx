import { useState } from "react";
import { useUpdateQuestion } from "@hooks/useQuestionSet";

export default function QuestionItemEditModal({
  isOpen,
  onClose,
  onOverlayClick,
  setId,
  question,
}) {
  const updateQuestion = useUpdateQuestion();
  const [contents, setContents] = useState(question?.contents || "");

  const handleEdit = () => {
    updateQuestion.mutate({
      setId,
      id: question.id,
      question: { contents },
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
        className="flex max-h-[80vh] w-[500px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-xl">질문 수정</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <textarea
                className="h-32 w-full resize-none rounded-lg border border-gray-200 p-2.5"
                placeholder="면접 질문을 입력하세요"
                value={contents}
                onChange={(e) => setContents(e.target.value)}
              />
            </div>
          </div>
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
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
