import { useState } from "react";
import { useCreateQuestionSet } from "@hooks/useQuestionSet";

export default function QuestionSetAddModal({
  isOpen,
  onClose,
  onOverlayClick,
}) {
  const createQuestionSet = useCreateQuestionSet();
  const [formData, setFormData] = useState({
    category: "Frontend",
    title: "",
    description: "",
    open: false,
  });

  const handleCreate = () => {
    createQuestionSet.mutate(formData);
    onClose();
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
          <h2 className="font-bold text-xl">새로운 면접 세트 만들기</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block font-medium">카테고리</label>
            <select
              className="w-full rounded-lg border border-gray-200 p-2.5"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Android">Android</option>
              <option value="iOS">iOS</option>
              <option value="DevOps">DevOps</option>
              <option value="CS">CS</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block font-medium">제목</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 p-2.5"
              placeholder="면접 세트 제목을 입력하세요"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="mb-1.5 block font-medium">설명</label>
            <textarea
              className="h-24 w-full resize-none rounded-lg border border-gray-200 p-2.5"
              placeholder="면접 세트에 대한 설명을 입력하세요"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={formData.open}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, open: e.target.checked }))
                }
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full"></div>
              <span className="ml-3 font-medium">공개</span>
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handleCreate}
            className="rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-600"
          >
            만들기
          </button>
        </div>
      </div>
    </div>
  );
}
