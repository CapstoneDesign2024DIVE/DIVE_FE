export default function Modal({ isOpen, onClose, onConfirm, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[400px] rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-6 text-center">
          <h3 className="mb-2 font-bold text-xl">{title}</h3>
          <div className="text-gray-600">{children}</div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onConfirm}
            className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
