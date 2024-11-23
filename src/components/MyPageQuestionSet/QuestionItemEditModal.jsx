import { useState } from "react";
import { useUpdateQuestion } from "@hooks/useQuestion";

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
    if (!contents.trim()) return;

    updateQuestion.mutate(
      {
        setId,
        id: question.id,
        contents: contents.trim(),
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error("Failed to update question:", error);
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-transparent"
      onClick={onOverlayClick}
    >
      <div
        className="w-[500px] rounded-lg border border-gray-200 bg-white p-6 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <h2 className="font-bold text-xl">질문 수정</h2>
        </div>
        <div>
          <label className="mb-1.5 block font-medium">질문 내용</label>
          <textarea
            className="h-32 w-full resize-none rounded-lg border border-gray-200 p-2.5"
            placeholder="면접 질문을 입력하세요"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100"
            disabled={updateQuestion.isPending}
          >
            취소
          </button>
          <button
            onClick={handleEdit}
            className="rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-600 disabled:opacity-50"
            disabled={updateQuestion.isPending || !contents.trim()}
          >
            {updateQuestion.isPending ? "수정 중..." : "수정하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
