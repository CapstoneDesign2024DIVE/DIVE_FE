import { useState } from "react";
import { useCreateQuestion } from "@hooks/useQuestion";

export default function QuestionItemAddModal({
  isOpen,
  onClose,
  onOverlayClick,
  setId,
}) {
  const createQuestion = useCreateQuestion();
  const [contents, setContents] = useState("");

  const handleCreate = () => {
    if (!contents.trim()) return;

    createQuestion.mutate(
      {
        setId,
        contents: contents.trim(),
      },
      {
        onSuccess: () => {
          onClose();
          setContents("");
        },
        onError: (error) => {
          console.error("Failed to create question:", error);
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
          <h2 className="font-bold text-xl">질문 추가</h2>
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
            disabled={createQuestion.isPending}
          >
            취소
          </button>
          <button
            onClick={handleCreate}
            className="rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-600 disabled:opacity-50"
            disabled={createQuestion.isPending || !contents.trim()}
          >
            {createQuestion.isPending ? "추가 중..." : "추가하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
