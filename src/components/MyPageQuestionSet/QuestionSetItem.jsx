import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import QuestionItemEditModal from "./QuestionItemEditModal";
import QuestionItemDeleteModal from "./QuestionItemDeleteModal";

export default function QuestionItem({ question, isSelected, onClick }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleOverlayClick = (e, closeModal) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <div
        className={`group relative w-full cursor-pointer overflow-hidden rounded-lg border bg-white transition-all duration-200 ${
          isSelected
            ? "border-indigo-500"
            : "border-gray-200 hover:border-gray-300"
        }`}
        onClick={onClick}
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
                onClick={handleEditClick}
              >
                <FiEdit2 size={18} />
              </button>
              <button
                className="flex h-12 w-12 items-center justify-center bg-red-200 text-red-600 transition-colors hover:bg-red-300"
                onClick={handleDeleteClick}
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <QuestionItemEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onOverlayClick={(e) =>
            handleOverlayClick(e, () => setIsEditModalOpen(false))
          }
          onEdit={() => {
            // 수정 로직
            setIsEditModalOpen(false);
          }}
          question={question}
        />
      )}

      {isDeleteModalOpen && (
        <QuestionItemDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onOverlayClick={(e) =>
            handleOverlayClick(e, () => setIsDeleteModalOpen(false))
          }
          onDelete={() => {
            // 삭제 로직
            setIsDeleteModalOpen(false);
          }}
        />
      )}
    </>
  );
}
