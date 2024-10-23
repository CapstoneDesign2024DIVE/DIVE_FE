export default function QuestionSetMenuModal({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onOverlayClick,
  set,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-transparent"
      onClick={onOverlayClick}
    >
      <div
        className="flex max-h-[80vh] w-[700px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-bold text-xl">면접 세트 관리</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block font-medium">카테고리</label>
              <select
                className="w-full rounded-lg border border-gray-200 p-2.5"
                value={set.category}
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
                value={set.title}
              />
            </div>
            <div>
              <label className="mb-1.5 block font-medium">설명</label>
              <textarea
                className="h-24 w-full resize-none rounded-lg border border-gray-200 p-2.5"
                placeholder="면접 세트에 대한 설명을 입력하세요"
                value={set.description}
              />
            </div>
            <div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={set.open}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full"></div>
                <span className="ml-3 font-medium">공개</span>
              </label>
            </div>
            <div>
              <label className="mb-1.5 block font-medium">질문 목록</label>
              <div className="mt-2 space-y-2">
                {set.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="group flex items-center gap-2"
                  >
                    <div className="flex-1 rounded-lg border border-gray-200 bg-white p-3">
                      <p className="font-medium text-base text-gray-900">
                        {question.contents}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
              onClick={onEdit}
              className="rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-600"
            >
              수정하기
            </button>
            <button
              onClick={onDelete}
              className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
            >
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
