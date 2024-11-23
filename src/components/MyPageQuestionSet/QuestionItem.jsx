import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import QuestionItemEditModal from "./QuestionItemEditModal";
import QuestionItemDeleteModal from "./QuestionItemDeleteModal";

export default function QuestionItem({
  setId,
  question,
  selectedQuestions,
  onToggleSelect,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isSelected = selectedQuestions.includes(question.id);

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
        onClick={() => onToggleSelect(question.id)}
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
              className={`absolute right-0 top-0 flex h-full transform items-center transition-transform duration-300 ease-in-out ${isSelected ? "translate-x-0" : "translate-x-full"}`}
            >
              <button
                className="flex h-full w-12 items-center justify-center bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                onClick={handleEditClick}
              >
                <FiEdit2 size={18} />
              </button>
              <button
                className="flex h-full w-12 items-center justify-center bg-red-100 text-red-600 transition-colors hover:bg-red-200"
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
          setId={setId}
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
          setId={setId}
          questionId={question.id}
        />
      )}
    </>
  );
}
